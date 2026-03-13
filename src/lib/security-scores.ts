import fs from "fs";
import path from "path";

export interface SecurityScanResult {
  skill_slug: string;
  score: number;
  badge: "pass" | "warn" | "review" | "fail";
  summary: {
    total_findings: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

let cachedScores: Map<string, SecurityScanResult> | null = null;

/**
 * Load security scan results from the scan-results.json file
 */
export function loadSecurityScores(): Map<string, SecurityScanResult> {
  if (cachedScores) return cachedScores;

  const resultsPath = path.join(
    process.cwd(),
    "scraper/out/security/scan-results.json"
  );

  try {
    if (fs.existsSync(resultsPath)) {
      const data = JSON.parse(fs.readFileSync(resultsPath, "utf-8"));
      cachedScores = new Map(
        data.map((r: SecurityScanResult) => [r.skill_slug, r])
      );
      return cachedScores;
    }
  } catch (e) {
    console.error("Failed to load security scores:", e);
  }

  cachedScores = new Map();
  return cachedScores;
}

/**
 * Get security data for a specific skill
 */
export function getSecurityScore(slug: string): SecurityScanResult | undefined {
  const scores = loadSecurityScores();
  return scores.get(slug);
}

/**
 * Get badge color class for security badge
 */
export function getSecurityBadgeColor(badge: string): string {
  switch (badge) {
    case "pass":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "warn":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "review":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    case "fail":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
}

/**
 * Get badge emoji for security badge
 */
export function getSecurityBadgeEmoji(badge: string): string {
  switch (badge) {
    case "pass":
      return "🟢";
    case "warn":
      return "🟡";
    case "review":
      return "🟠";
    case "fail":
      return "🔴";
    default:
      return "⚪";
  }
}
