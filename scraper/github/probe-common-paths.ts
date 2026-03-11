const COMMON_BRANCHES = ["main", "master"];
const COMMON_FILENAMES = ["SKILL.md", "skill.md"];

export interface ProbeResult {
  url: string | null;
  branch: string | null;
  filename: string | null;
  success: boolean;
}

async function headCheck(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
}

export async function probeCommonPaths(
  owner: string,
  repo: string
): Promise<ProbeResult> {
  for (const branch of COMMON_BRANCHES) {
    for (const filename of COMMON_FILENAMES) {
      const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filename}`;
      const exists = await headCheck(url);

      if (exists) {
        return {
          url,
          branch,
          filename,
          success: true,
        };
      }
    }
  }

  return {
    url: null,
    branch: null,
    filename: null,
    success: false,
  };
}

export async function probeWithPaths(
  owner: string,
  repo: string,
  additionalPaths: string[] = []
): Promise<ProbeResult> {
  const basicResult = await probeCommonPaths(owner, repo);
  if (basicResult.success) {
    return basicResult;
  }

  for (const branch of COMMON_BRANCHES) {
    for (const customPath of additionalPaths) {
      const pathWithSkill = customPath.endsWith(".md")
        ? customPath
        : `${customPath}/SKILL.md`;
      const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${pathWithSkill}`;
      const exists = await headCheck(url);

      if (exists) {
        return {
          url,
          branch,
          filename: pathWithSkill,
          success: true,
        };
      }
    }
  }

  return {
    url: null,
    branch: null,
    filename: null,
    success: false,
  };
}
