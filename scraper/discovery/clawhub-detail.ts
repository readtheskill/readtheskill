import { RateLimiter } from "../lib/rate-limiter.js";
import { writeRawSnapshot, readRawSnapshot } from "../lib/fs-utils.js";
import type { ClawHubDetailResult, RawSkillRecord } from "../lib/types.js";

const CLAWHUB_API = "https://clawhub.ai/api";

async function fetchSkillDetail(slug: string): Promise<ClawHubDetailResult> {
  const url = `${CLAWHUB_API}/skill?slug=${encodeURIComponent(slug)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Detail fetch failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data as ClawHubDetailResult;
}

function parseGitHubUrl(url?: string): { owner?: string; repo?: string } {
  if (!url) return {};
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (match) {
    return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
  }
  return {};
}

function extractTagsArray(tags?: Record<string, string>): string[] {
  if (!tags) return [];
  return Object.keys(tags).filter((t) => t !== "latest");
}

function parseApiResponse(response: ClawHubDetailResult): {
  slug: string;
  name: string;
  description: string;
  github_url?: string;
  tags: string[];
  created_at?: string;
  updated_at?: string;
  owner_handle?: string;
} {
  const skill = response.skill;
  if (!skill) {
    throw new Error("Invalid API response: missing skill object");
  }

  return {
    slug: skill.slug,
    name: skill.displayName || skill.slug,
    description: skill.summary || "",
    github_url: response.owner?.handle
      ? `https://github.com/${response.owner.handle}`
      : undefined,
    tags: extractTagsArray(skill.tags),
    created_at: skill.createdAt ? new Date(skill.createdAt).toISOString() : undefined,
    updated_at: skill.updatedAt ? new Date(skill.updatedAt).toISOString() : undefined,
    owner_handle: response.owner?.handle,
  };
}

export async function fetchAllDetails(
  slugs: string[],
  options?: {
    onProgress?: (completed: number, total: number, slug: string) => void;
    skipCached?: boolean;
  }
): Promise<RawSkillRecord[]> {
  const rateLimiter = new RateLimiter({ delayMs: 300, maxConcurrency: 5 });
  const records: RawSkillRecord[] = [];
  const skipCached = options?.skipCached ?? true;

  console.log(`[Detail] Fetching details for ${slugs.length} slugs...`);

  let completed = 0;
  for (const slug of slugs) {
    if (skipCached) {
      const cached = readRawSnapshot<ClawHubDetailResult>(`detail-${slug}.json`);
      if (cached && cached.skill) {
        try {
          const parsed = parseApiResponse(cached);
          const { owner, repo } = parseGitHubUrl(parsed.github_url);
          records.push({
            slug: parsed.slug,
            name: parsed.name,
            description: parsed.description,
            github_url: parsed.github_url,
            repo_owner: owner || parsed.owner_handle,
            repo_name: repo,
            clawhub_url: `https://clawhub.ai/skill/${parsed.slug}`,
            tags: parsed.tags,
            created_at: parsed.created_at,
            updated_at: parsed.updated_at,
            raw_api_response: cached,
          });
          completed++;
          options?.onProgress?.(completed, slugs.length, slug);
          continue;
        } catch {
          // Cached data is invalid, re-fetch
        }
      }
    }

    const result = await rateLimiter.execute(
      () => fetchSkillDetail(slug),
      `detail:${slug}`
    );

    if (result.error || !result.data) {
      console.warn(`[Detail] Failed to fetch ${slug}: ${result.error}`);
      completed++;
      options?.onProgress?.(completed, slugs.length, slug);
      continue;
    }

    const apiResponse = result.data;
    writeRawSnapshot(`detail-${slug}.json`, apiResponse);

    try {
      const parsed = parseApiResponse(apiResponse);
      const { owner, repo } = parseGitHubUrl(parsed.github_url);
      records.push({
        slug: parsed.slug,
        name: parsed.name,
        description: parsed.description,
        github_url: parsed.github_url,
        repo_owner: owner || parsed.owner_handle,
        repo_name: repo,
        clawhub_url: `https://clawhub.ai/skill/${parsed.slug}`,
        tags: parsed.tags,
        created_at: parsed.created_at,
        updated_at: parsed.updated_at,
        raw_api_response: apiResponse,
      });
    } catch (err) {
      console.warn(`[Detail] Failed to parse ${slug}: ${err}`);
    }

    completed++;
    options?.onProgress?.(completed, slugs.length, slug);

    if (completed % 50 === 0) {
      console.log(`[Detail] Progress: ${completed}/${slugs.length}`);
    }
  }

  return records;
}

export async function runDetailFetch(slugsFile?: string): Promise<RawSkillRecord[]> {
  const slugs = readRawSnapshot<string[]>(slugsFile || "discovered-slugs.json");
  if (!slugs || slugs.length === 0) {
    throw new Error("No slugs found. Run discovery first.");
  }

  const records = await fetchAllDetails(slugs);

  writeRawSnapshot("raw-records.json", records);
  console.log(`[Detail] Saved ${records.length} records to raw-records.json`);

  return records;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runDetailFetch()
    .then((records) => {
      console.log(`\n[Detail] Complete! Fetched ${records.length} skill details.`);
    })
    .catch((err) => {
      console.error("[Detail] Failed:", err);
      process.exit(1);
    });
}
