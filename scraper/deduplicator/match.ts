import type { CategorizedSkillRecord } from "../lib/types.js";
import type { ExistingRegistry, ExistingSkillEntry } from "./load-existing.js";

export interface MatchResult {
  matchType: "slug" | "repo" | "skill_url" | "none";
  existingEntry?: ExistingSkillEntry;
  confidence: number;
}

function normalizeSlug(slug: string): string {
  return slug.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");
}

function extractRepoKey(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (match) {
    return `${match[1].toLowerCase()}/${match[2].toLowerCase().replace(/\.git$/, "")}`;
  }
  return null;
}

export function findMatch(
  record: CategorizedSkillRecord,
  registry: ExistingRegistry
): MatchResult {
  const normalizedSlug = normalizeSlug(record.slug);
  const existingBySlug = registry.bySlug.get(normalizedSlug);
  if (existingBySlug) {
    return {
      matchType: "slug",
      existingEntry: existingBySlug,
      confidence: 1.0,
    };
  }

  if (record.skill_url) {
    const existingBySkillUrl = registry.bySkillUrl.get(record.skill_url);
    if (existingBySkillUrl) {
      return {
        matchType: "skill_url",
        existingEntry: existingBySkillUrl,
        confidence: 0.95,
      };
    }
  }

  const repoKey = extractRepoKey(record.github_url);
  if (repoKey) {
    const existingByRepo = registry.byRepo.get(repoKey);
    if (existingByRepo && existingByRepo.length > 0) {
      const bestMatch = existingByRepo.reduce((best, entry) => {
        const similarity = calculateSimilarity(record.name, entry.name);
        return similarity > (best?.similarity || 0) ? { entry, similarity } : best;
      }, null as { entry: ExistingSkillEntry; similarity: number } | null);

      if (bestMatch && bestMatch.similarity > 0.5) {
        return {
          matchType: "repo",
          existingEntry: bestMatch.entry,
          confidence: 0.8 * bestMatch.similarity,
        };
      }
    }
  }

  return {
    matchType: "none",
    existingEntry: undefined,
    confidence: 0,
  };
}

function calculateSimilarity(a: string, b: string): number {
  const normalize = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]/g, "");

  const na = normalize(a);
  const nb = normalize(b);

  if (na === nb) return 1.0;

  if (na.includes(nb) || nb.includes(na)) return 0.8;

  const wordsA = new Set(a.toLowerCase().split(/\s+/));
  const wordsB = new Set(b.toLowerCase().split(/\s+/));
  const intersection = [...wordsA].filter((w) => wordsB.has(w));
  const union = new Set([...wordsA, ...wordsB]);

  return intersection.length / union.size;
}

export function matchAllRecords(
  records: CategorizedSkillRecord[],
  registry: ExistingRegistry
): Array<{ record: CategorizedSkillRecord; match: MatchResult }> {
  return records.map((record) => ({
    record,
    match: findMatch(record, registry),
  }));
}
