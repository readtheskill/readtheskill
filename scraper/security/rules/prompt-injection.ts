import type { SecurityRule } from "../types";

export const promptInjectionRules: SecurityRule[] = [
  {
    id: "PI-001",
    category: "prompt_injection",
    severity: "high",
    description: "HTML comment containing action verb (possible prompt injection)",
    pattern:
      /<!--[\s\S]*?(?:execute|send|fetch|read|write|POST|GET|DELETE|include|ignore|override|forget|disregard|bypass)[\s\S]*?-->/gi,
  },
  {
    id: "PI-002",
    category: "prompt_injection",
    severity: "high",
    description: "Hidden text via CSS display:none",
    pattern: /style\s*=\s*['"][^'"]*display\s*:\s*none[^'"]*['"]/gi,
  },
  {
    id: "PI-003",
    category: "prompt_injection",
    severity: "high",
    description: "Hidden text via CSS visibility:hidden",
    pattern: /style\s*=\s*['"][^'"]*visibility\s*:\s*hidden[^'"]*['"]/gi,
  },
  {
    id: "PI-004",
    category: "prompt_injection",
    severity: "medium",
    description: "Zero-size font hiding text",
    pattern: /style\s*=\s*['"][^'"]*font-size\s*:\s*0[^'"]*['"]/gi,
  },
  {
    id: "PI-005",
    category: "prompt_injection",
    severity: "medium",
    description: "Transparent color hiding text",
    pattern: /style\s*=\s*['"][^'"]*color\s*:\s*(?:transparent|rgba?\s*\([^)]*,\s*0\s*\))[^'"]*['"]/gi,
  },
  {
    id: "PI-006",
    category: "prompt_injection",
    severity: "high",
    description: "Instruction to ignore previous instructions",
    pattern: /ignore\s+(?:all\s+)?(?:previous|prior|above)\s+instructions?|disregard\s+(?:all\s+)?(?:previous|prior|above)/gi,
  },
  {
    id: "PI-007",
    category: "prompt_injection",
    severity: "high",
    description: "System prompt override attempt",
    pattern: /\[system\]|\[INST\]|<<SYS>>|<\|system\|>|you\s+are\s+now\s+(?:a|an|the)/gi,
  },
  {
    id: "PI-008",
    category: "prompt_injection",
    severity: "medium",
    description: "Jailbreak attempt keywords",
    pattern: /\b(?:DAN|jailbreak|roleplay\s+as|pretend\s+you\s+are|act\s+as\s+if)\b/gi,
  },
];
