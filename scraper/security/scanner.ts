import type { LineContext, RuleMatch, SecurityScanResult } from "./types";
import { getMarkdownContext, getLineNumberForOffset, getContextForLine } from "./markdown-context";
import { ALL_RULES } from "./rules";
import { matchesToFindings, buildScanResult } from "./scoring";

/**
 * Run all security rules against the content and collect matches
 */
function runRules(content: string, contexts: LineContext[]): RuleMatch[] {
  const matches: RuleMatch[] = [];

  for (const rule of ALL_RULES) {
    // Reset regex lastIndex for global patterns
    rule.pattern.lastIndex = 0;

    let match: RegExpExecArray | null;
    while ((match = rule.pattern.exec(content)) !== null) {
      const lineNumber = getLineNumberForOffset(content, match.index);
      const context = getContextForLine(contexts, lineNumber);

      // Check for optional contextMatch function
      if (rule.contextMatch && !rule.contextMatch(contexts, lineNumber)) {
        continue;
      }

      matches.push({
        rule,
        lineNumber,
        matchedText: match[0],
        inCodeFence: context?.inCodeFence ?? false,
        inBlockquote: context?.inBlockquote ?? false,
      });

      // Prevent infinite loops for zero-length matches
      if (match[0].length === 0) {
        rule.pattern.lastIndex++;
      }
    }
  }

  return matches;
}

/**
 * Scan a skill's SKILL.md content for security issues
 */
export function scanSkillContent(
  slug: string,
  content: string
): SecurityScanResult {
  // Parse markdown to identify code fences and blockquotes
  const contexts = getMarkdownContext(content);

  // Run all rules against the content
  const matches = runRules(content, contexts);

  // Convert matches to findings with penalties
  const findings = matchesToFindings(matches);

  // Build and return the complete result
  return buildScanResult(slug, findings);
}

/**
 * Scan multiple skills in batch
 */
export async function scanSkillsBatch(
  skills: Array<{ slug: string; content: string }>,
  onProgress?: (current: number, total: number) => void
): Promise<SecurityScanResult[]> {
  const results: SecurityScanResult[] = [];
  const total = skills.length;

  for (let i = 0; i < skills.length; i++) {
    const skill = skills[i];
    const result = scanSkillContent(skill.slug, skill.content);
    results.push(result);

    if (onProgress) {
      onProgress(i + 1, total);
    }
  }

  return results;
}

/**
 * Generate a summary report for batch scan results
 */
export function generateBatchReport(results: SecurityScanResult[]): {
  total_scanned: number;
  by_badge: Record<string, number>;
  by_category: Record<string, number>;
  average_score: number;
  critical_findings: number;
  skills_with_critical: string[];
} {
  const byBadge: Record<string, number> = { pass: 0, warn: 0, review: 0, fail: 0 };
  const byCategory: Record<string, number> = {};
  let totalScore = 0;
  let criticalFindings = 0;
  const skillsWithCritical: string[] = [];

  for (const result of results) {
    byBadge[result.badge]++;
    totalScore += result.score;

    for (const finding of result.findings) {
      byCategory[finding.category] = (byCategory[finding.category] || 0) + 1;

      if (finding.severity === "critical") {
        criticalFindings++;
        if (!skillsWithCritical.includes(result.skill_slug)) {
          skillsWithCritical.push(result.skill_slug);
        }
      }
    }
  }

  return {
    total_scanned: results.length,
    by_badge: byBadge,
    by_category: byCategory,
    average_score: results.length > 0 ? Math.round(totalScore / results.length) : 0,
    critical_findings: criticalFindings,
    skills_with_critical: skillsWithCritical,
  };
}

export { ALL_RULES } from "./rules";
export * from "./types";
