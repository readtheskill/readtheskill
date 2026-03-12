import { execSync } from "child_process";

export interface TreeSearchResult {
  paths: string[];
  error: string | null;
}

export async function searchTreeForSkillMd(
  owner: string,
  repo: string,
  branch: string
): Promise<TreeSearchResult> {
  try {
    const result = execSync(
      `gh api repos/${owner}/${repo}/git/trees/${branch}?recursive=1 --jq '.tree[].path'`,
      { encoding: "utf-8", timeout: 30000, maxBuffer: 10 * 1024 * 1024 }
    );

    const allPaths = result.split("\n").filter(Boolean);

    const skillPaths = allPaths.filter((path) => {
      const lower = path.toLowerCase();
      return lower.endsWith("skill.md") || lower.includes("/skill.md");
    });

    return { paths: skillPaths, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { paths: [], error: message };
  }
}

export function selectBestSkillPath(paths: string[]): string | null {
  if (paths.length === 0) return null;
  if (paths.length === 1) return paths[0];

  const priorities = [
    (p: string) => p === "SKILL.md",
    (p: string) => p === "skill.md",
    (p: string) => p.toLowerCase() === "skill.md",
    (p: string) => !p.includes("/"),
    (p: string) => p.split("/").length <= 2,
  ];

  for (const priority of priorities) {
    const match = paths.find(priority);
    if (match) return match;
  }

  return paths.sort((a, b) => a.split("/").length - b.split("/").length)[0];
}

export async function findSkillMdPath(
  owner: string,
  repo: string,
  branch: string
): Promise<{ path: string | null; error: string | null }> {
  const result = await searchTreeForSkillMd(owner, repo, branch);

  if (result.error) {
    return { path: null, error: result.error };
  }

  const bestPath = selectBestSkillPath(result.paths);
  return { path: bestPath, error: null };
}
