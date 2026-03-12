import type { SecurityRule } from "../types";

export const zeroWidthRules: SecurityRule[] = [
  {
    id: "ZW-001",
    category: "zero_width",
    severity: "critical",
    description: "Zero-width space character detected",
    pattern: /\u200B/g,
  },
  {
    id: "ZW-002",
    category: "zero_width",
    severity: "critical",
    description: "Zero-width non-joiner detected",
    pattern: /\u200C/g,
  },
  {
    id: "ZW-003",
    category: "zero_width",
    severity: "critical",
    description: "Zero-width joiner detected",
    pattern: /\u200D/g,
  },
  {
    id: "ZW-004",
    category: "zero_width",
    severity: "critical",
    description: "Byte order mark / zero-width no-break space detected",
    pattern: /\uFEFF/g,
  },
  {
    id: "ZW-005",
    category: "zero_width",
    severity: "high",
    description: "Left-to-right mark (potential text direction exploit)",
    pattern: /\u200E/g,
  },
  {
    id: "ZW-006",
    category: "zero_width",
    severity: "high",
    description: "Right-to-left mark (potential text direction exploit)",
    pattern: /\u200F/g,
  },
  {
    id: "ZW-007",
    category: "zero_width",
    severity: "high",
    description: "Word joiner character",
    pattern: /\u2060/g,
  },
];
