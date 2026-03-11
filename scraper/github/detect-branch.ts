import { execSync } from "child_process";

export interface BranchDetectionResult {
  default_branch: string | null;
  error: string | null;
}

export async function detectDefaultBranch(
  owner: string,
  repo: string
): Promise<BranchDetectionResult> {
  try {
    const result = execSync(
      `gh api repos/${owner}/${repo} --jq '.default_branch'`,
      { encoding: "utf-8", timeout: 15000 }
    ).trim();

    if (result && result !== "null") {
      return { default_branch: result, error: null };
    }

    return { default_branch: null, error: "No default branch found" };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { default_branch: null, error: message };
  }
}

export async function detectBranchWithFallback(
  owner: string,
  repo: string
): Promise<string> {
  const result = await detectDefaultBranch(owner, repo);
  if (result.default_branch) {
    return result.default_branch;
  }

  const fallbacks = ["main", "master", "develop", "dev"];
  for (const branch of fallbacks) {
    try {
      const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`;
      const response = await fetch(url, { method: "HEAD" });
      if (response.ok) {
        return branch;
      }
    } catch {
      continue;
    }
  }

  return "main";
}
