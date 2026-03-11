import { probeCommonPaths, probeWithPaths } from "./probe-common-paths.js";
import { detectBranchWithFallback } from "./detect-branch.js";
import { findSkillMdPath } from "./tree-search.js";
import type { RawSkillRecord, ResolvedSkillRecord } from "../lib/types.js";
import { readProcessedData, writeProcessedData } from "../lib/fs-utils.js";
import { RateLimiter } from "../lib/rate-limiter.js";

export interface ResolutionResult {
  skill_url: string | null;
  method: "probe" | "branch-detect" | "tree-search" | "fallback" | null;
  confidence: number;
  error: string | null;
}

export async function resolveSkillUrl(
  owner: string,
  repo: string
): Promise<ResolutionResult> {
  const probeResult = await probeCommonPaths(owner, repo);
  if (probeResult.success && probeResult.url) {
    return {
      skill_url: probeResult.url,
      method: "probe",
      confidence: 1.0,
      error: null,
    };
  }

  const branch = await detectBranchWithFallback(owner, repo);

  const extendedProbe = await probeWithPaths(owner, repo, [
    "docs",
    "skill",
    "skills",
    ".cursor",
    ".cursor/skills",
  ]);
  if (extendedProbe.success && extendedProbe.url) {
    return {
      skill_url: extendedProbe.url,
      method: "branch-detect",
      confidence: 0.9,
      error: null,
    };
  }

  const treeResult = await findSkillMdPath(owner, repo, branch);
  if (treeResult.path) {
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${treeResult.path}`;
    return {
      skill_url: url,
      method: "tree-search",
      confidence: 0.8,
      error: null,
    };
  }

  const fallbackUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/SKILL.md`;
  return {
    skill_url: fallbackUrl,
    method: "fallback",
    confidence: 0.3,
    error: treeResult.error || "No SKILL.md found via any method",
  };
}

export async function resolveAllSkillUrls(
  records: RawSkillRecord[],
  options?: {
    onProgress?: (completed: number, total: number) => void;
  }
): Promise<ResolvedSkillRecord[]> {
  const rateLimiter = new RateLimiter({ delayMs: 200, maxConcurrency: 3 });
  const resolved: ResolvedSkillRecord[] = [];
  let completed = 0;

  console.log(`[Resolve] Resolving SKILL.md URLs for ${records.length} records...`);

  for (const record of records) {
    if (!record.repo_owner || !record.repo_name) {
      resolved.push({
        ...record,
        skill_url: undefined,
        skill_url_method: undefined,
        skill_url_confidence: 0,
        resolution_error: "No GitHub repository info",
      });
      completed++;
      options?.onProgress?.(completed, records.length);
      continue;
    }

    const result = await rateLimiter.execute(
      () => resolveSkillUrl(record.repo_owner!, record.repo_name!),
      `resolve:${record.slug}`
    );

    if (result.error || !result.data) {
      resolved.push({
        ...record,
        skill_url: undefined,
        skill_url_method: undefined,
        skill_url_confidence: 0,
        resolution_error: result.error || "Unknown error",
      });
    } else {
      resolved.push({
        ...record,
        skill_url: result.data.skill_url || undefined,
        skill_url_method: result.data.method || undefined,
        skill_url_confidence: result.data.confidence,
        resolution_error: result.data.error || undefined,
      });
    }

    completed++;
    options?.onProgress?.(completed, records.length);

    if (completed % 50 === 0) {
      console.log(`[Resolve] Progress: ${completed}/${records.length}`);
    }
  }

  return resolved;
}

export async function runResolve(): Promise<ResolvedSkillRecord[]> {
  const normalized = readProcessedData<RawSkillRecord[]>("normalized-records.json");
  if (!normalized || normalized.length === 0) {
    throw new Error("No normalized records found. Run normalize first.");
  }

  const resolved = await resolveAllSkillUrls(normalized);

  writeProcessedData("resolved-records.json", resolved);
  console.log(`[Resolve] Saved ${resolved.length} resolved records`);

  const withUrl = resolved.filter((r) => r.skill_url && r.skill_url_confidence > 0.5);
  console.log(`[Resolve] ${withUrl.length}/${resolved.length} have confident SKILL.md URLs`);

  return resolved;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runResolve()
    .then((records) => {
      console.log(`\n[Resolve] Complete! Resolved ${records.length} records.`);
    })
    .catch((err) => {
      console.error("[Resolve] Failed:", err);
      process.exit(1);
    });
}
