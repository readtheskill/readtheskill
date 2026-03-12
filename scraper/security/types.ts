export type Severity = "critical" | "high" | "medium" | "low";
export type Badge = "pass" | "warn" | "review" | "fail";

export interface SecurityFinding {
  category: string;
  severity: Severity;
  rule_id: string;
  line_number: number;
  matched_text: string;
  in_code_fence: boolean;
  in_blockquote: boolean;
  penalty_applied: number;
  description: string;
}

export interface SecurityScanResult {
  skill_slug: string;
  scanned_at: string;
  scanner_version: string;
  score: number;
  badge: Badge;
  findings: SecurityFinding[];
  summary: {
    total_findings: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    in_code_fence: number;
  };
}

export interface SecurityRule {
  id: string;
  category: string;
  severity: Severity;
  description: string;
  pattern: RegExp;
  contextMatch?: (lines: LineContext[], matchIndex: number) => boolean;
}

export interface LineContext {
  lineNumber: number;
  text: string;
  inCodeFence: boolean;
  inBlockquote: boolean;
}

export interface RuleMatch {
  rule: SecurityRule;
  lineNumber: number;
  matchedText: string;
  inCodeFence: boolean;
  inBlockquote: boolean;
}

export const SEVERITY_PENALTIES: Record<Severity, number> = {
  critical: 25,
  high: 15,
  medium: 8,
  low: 3,
};

export const CODE_FENCE_PENALTY_MULTIPLIER = 0.5;

export const BADGE_THRESHOLDS = {
  pass: 90,
  warn: 70,
  review: 40,
} as const;

export const SCANNER_VERSION = "1.0.0";
