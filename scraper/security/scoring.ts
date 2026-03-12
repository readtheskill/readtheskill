import type {
  Badge,
  RuleMatch,
  SecurityFinding,
  SecurityScanResult,
  Severity,
} from "./types";
import {
  SEVERITY_PENALTIES,
  CODE_FENCE_PENALTY_MULTIPLIER,
  BADGE_THRESHOLDS,
  SCANNER_VERSION,
} from "./types";

/**
 * Calculate the penalty for a single finding, accounting for code fence context
 */
export function calculatePenalty(
  severity: Severity,
  inCodeFence: boolean,
  inBlockquote: boolean
): number {
  let penalty = SEVERITY_PENALTIES[severity];

  // 50% reduction for findings inside code fences (they're examples)
  if (inCodeFence) {
    penalty *= CODE_FENCE_PENALTY_MULTIPLIER;
  }

  // 30% reduction for findings inside blockquotes (may be quoting what NOT to do)
  if (inBlockquote && !inCodeFence) {
    penalty *= 0.7;
  }

  return penalty;
}

/**
 * Convert a score to a badge
 */
export function scoreToBadge(score: number): Badge {
  if (score >= BADGE_THRESHOLDS.pass) return "pass";
  if (score >= BADGE_THRESHOLDS.warn) return "warn";
  if (score >= BADGE_THRESHOLDS.review) return "review";
  return "fail";
}

/**
 * Convert rule matches to security findings with calculated penalties
 */
export function matchesToFindings(matches: RuleMatch[]): SecurityFinding[] {
  return matches.map((match) => {
    const penalty = calculatePenalty(
      match.rule.severity,
      match.inCodeFence,
      match.inBlockquote
    );

    return {
      category: match.rule.category,
      severity: match.rule.severity,
      rule_id: match.rule.id,
      line_number: match.lineNumber,
      matched_text: match.matchedText.substring(0, 200),
      in_code_fence: match.inCodeFence,
      in_blockquote: match.inBlockquote,
      penalty_applied: penalty,
      description: match.rule.description,
    };
  });
}

/**
 * Calculate the final security score from findings
 */
export function calculateScore(findings: SecurityFinding[]): number {
  const totalPenalty = findings.reduce((sum, f) => sum + f.penalty_applied, 0);
  return Math.max(0, 100 - totalPenalty);
}

/**
 * Generate a summary of findings by severity
 */
export function generateSummary(findings: SecurityFinding[]): SecurityScanResult["summary"] {
  return {
    total_findings: findings.length,
    critical: findings.filter((f) => f.severity === "critical").length,
    high: findings.filter((f) => f.severity === "high").length,
    medium: findings.filter((f) => f.severity === "medium").length,
    low: findings.filter((f) => f.severity === "low").length,
    in_code_fence: findings.filter((f) => f.in_code_fence).length,
  };
}

/**
 * Build the complete scan result
 */
export function buildScanResult(
  slug: string,
  findings: SecurityFinding[]
): SecurityScanResult {
  const score = calculateScore(findings);
  const badge = scoreToBadge(score);
  const summary = generateSummary(findings);

  return {
    skill_slug: slug,
    scanned_at: new Date().toISOString(),
    scanner_version: SCANNER_VERSION,
    score,
    badge,
    findings,
    summary,
  };
}
