import { RateLimiter } from "../lib/rate-limiter.js";
import { writeRawSnapshot, readRawSnapshot } from "../lib/fs-utils.js";
import type { ClawHubSearchResult } from "../lib/types.js";
import seeds from "../config/search-seeds.json" with { type: "json" };

const CLAWHUB_API = "https://clawhub.ai/api";
const SEARCH_LIMIT = 50;

interface SearchResponse {
  results?: ClawHubSearchResult[];
  skills?: ClawHubSearchResult[];
  data?: ClawHubSearchResult[];
  total?: number;
}

async function searchClawHub(
  query: string,
  limit: number,
  offset: number
): Promise<ClawHubSearchResult[]> {
  const url = `${CLAWHUB_API}/search?q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Search failed: ${response.status} ${response.statusText}`);
  }

  const data: SearchResponse = await response.json();
  return data.results || data.skills || data.data || [];
}

export async function harvestAllSlugs(
  seedQueries: string[] = seeds.seeds,
  options?: { maxPerQuery?: number; onProgress?: (query: string, found: number) => void }
): Promise<Set<string>> {
  const rateLimiter = new RateLimiter({ delayMs: 300, maxConcurrency: 3 });
  const allSlugs = new Set<string>();
  const maxPerQuery = options?.maxPerQuery ?? 500;

  console.log(`[Discovery] Starting harvest with ${seedQueries.length} seed queries...`);

  for (const query of seedQueries) {
    let offset = 0;
    let hasMore = true;
    let queryTotal = 0;

    while (hasMore && offset < maxPerQuery) {
      const result = await rateLimiter.execute(
        () => searchClawHub(query, SEARCH_LIMIT, offset),
        `search:${query}:${offset}`
      );

      if (result.error || !result.data) {
        console.warn(`[Discovery] Query "${query}" failed at offset ${offset}: ${result.error}`);
        break;
      }

      const results = result.data;
      if (results.length === 0) {
        hasMore = false;
      } else {
        for (const item of results) {
          if (item.slug && !allSlugs.has(item.slug)) {
            allSlugs.add(item.slug);
            queryTotal++;
          }
        }
        offset += SEARCH_LIMIT;
        hasMore = results.length === SEARCH_LIMIT;
      }
    }

    options?.onProgress?.(query, queryTotal);
    console.log(`[Discovery] Query "${query}": found ${queryTotal} new slugs (total: ${allSlugs.size})`);
  }

  return allSlugs;
}

export async function runDiscovery(
  options?: { limit?: number }
): Promise<{ slugs: string[]; savedTo: string }> {
  const cachedSlugs = readRawSnapshot<string[]>("discovered-slugs.json");
  if (cachedSlugs && cachedSlugs.length > 0) {
    console.log(`[Discovery] Using cached ${cachedSlugs.length} slugs from discovered-slugs.json`);
    const slugs = options?.limit ? cachedSlugs.slice(0, options.limit) : cachedSlugs;
    return { slugs, savedTo: "discovered-slugs.json" };
  }

  const slugSet = await harvestAllSlugs();
  const slugs = Array.from(slugSet);

  writeRawSnapshot("discovered-slugs.json", slugs);
  console.log(`[Discovery] Saved ${slugs.length} unique slugs to discovered-slugs.json`);

  const finalSlugs = options?.limit ? slugs.slice(0, options.limit) : slugs;
  return { slugs: finalSlugs, savedTo: "discovered-slugs.json" };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const limitArg = process.argv.find((a) => a.startsWith("--limit="));
  const limit = limitArg ? parseInt(limitArg.split("=")[1], 10) : undefined;

  runDiscovery({ limit })
    .then((result) => {
      console.log(`\n[Discovery] Complete! Found ${result.slugs.length} slugs.`);
    })
    .catch((err) => {
      console.error("[Discovery] Failed:", err);
      process.exit(1);
    });
}
