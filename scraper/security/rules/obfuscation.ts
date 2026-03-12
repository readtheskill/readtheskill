import type { SecurityRule } from "../types";

export const obfuscationRules: SecurityRule[] = [
  {
    id: "OBF-001",
    category: "obfuscation",
    severity: "medium",
    description: "Long base64 encoded string (potential payload)",
    pattern: /(?:[A-Za-z0-9+/]{50,}={0,2})/g,
  },
  {
    id: "OBF-002",
    category: "obfuscation",
    severity: "high",
    description: "String.fromCharCode - character code construction",
    pattern: /String\.fromCharCode\s*\(/gi,
  },
  {
    id: "OBF-003",
    category: "obfuscation",
    severity: "high",
    description: "Python chr() building strings",
    pattern: /chr\s*\(\s*\d+\s*\)\s*\+\s*chr|"".join\s*\(\s*\[?\s*chr/gi,
  },
  {
    id: "OBF-004",
    category: "obfuscation",
    severity: "medium",
    description: "Hex-encoded string sequence",
    pattern: /(?:\\x[0-9a-fA-F]{2}){4,}/g,
  },
  {
    id: "OBF-005",
    category: "obfuscation",
    severity: "medium",
    description: "Unicode escape sequence hiding",
    pattern: /(?:\\u[0-9a-fA-F]{4}){3,}/g,
  },
  {
    id: "OBF-006",
    category: "obfuscation",
    severity: "high",
    description: "atob() base64 decode followed by eval",
    pattern: /atob\s*\([^)]+\).*eval|eval\s*\(\s*atob/gi,
  },
  {
    id: "OBF-007",
    category: "obfuscation",
    severity: "medium",
    description: "Buffer.from with base64 encoding",
    pattern: /Buffer\.from\s*\([^,]+,\s*['"]base64['"]\s*\)/gi,
  },
];
