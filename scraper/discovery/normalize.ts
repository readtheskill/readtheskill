import { readRawSnapshot, writeProcessedData } from "../lib/fs-utils.js";
import type { RawSkillRecord } from "../lib/types.js";

export function normalizeSlug(slug: string | undefined): string {
  if (!slug) return "";
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function normalizeName(name: string): string {
  return name.trim().replace(/\s+/g, " ");
}

export function normalizeGitHubUrl(url?: string): string | undefined {
  if (!url) return undefined;
  let normalized = url.trim();
  if (normalized.endsWith(".git")) {
    normalized = normalized.slice(0, -4);
  }
  if (normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }
  return normalized;
}

export function extractRepoInfo(url?: string): { owner?: string; repo?: string; branch?: string } {
  if (!url) return {};

  const normalized = normalizeGitHubUrl(url);
  if (!normalized) return {};

  const patterns = [
    /github\.com\/([^/]+)\/([^/]+)(?:\/tree\/([^/]+))?/,
    /github\.com\/([^/]+)\/([^/]+)/,
  ];

  for (const pattern of patterns) {
    const match = normalized.match(pattern);
    if (match) {
      return {
        owner: match[1],
        repo: match[2],
        branch: match[3],
      };
    }
  }

  return {};
}

export function normalizeRecord(record: RawSkillRecord): RawSkillRecord | null {
  if (!record.slug || !record.name) {
    return null;
  }

  const { owner, repo, branch } = extractRepoInfo(record.github_url);

  return {
    ...record,
    slug: normalizeSlug(record.slug),
    name: normalizeName(record.name),
    description: record.description?.trim() || "",
    github_url: normalizeGitHubUrl(record.github_url),
    repo_owner: owner || record.repo_owner,
    repo_name: repo || record.repo_name,
    tags: record.tags?.map((t) => t.toLowerCase().trim()).filter(Boolean),
  };
}

export function normalizeRecords(records: RawSkillRecord[]): RawSkillRecord[] {
  return records
    .map(normalizeRecord)
    .filter((r): r is RawSkillRecord => r !== null && r.slug.length > 0);
}

export async function runNormalize(): Promise<RawSkillRecord[]> {
  const rawRecords = readRawSnapshot<RawSkillRecord[]>("raw-records.json");
  if (!rawRecords || rawRecords.length === 0) {
    throw new Error("No raw records found. Run detail fetch first.");
  }

  const normalized = normalizeRecords(rawRecords);

  writeProcessedData("normalized-records.json", normalized);
  console.log(`[Normalize] Saved ${normalized.length} normalized records`);

  return normalized;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runNormalize()
    .then((records) => {
      console.log(`\n[Normalize] Complete! Normalized ${records.length} records.`);
    })
    .catch((err) => {
      console.error("[Normalize] Failed:", err);
      process.exit(1);
    });
}
