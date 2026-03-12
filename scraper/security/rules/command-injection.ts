import type { SecurityRule } from "../types";

export const commandInjectionRules: SecurityRule[] = [
  {
    id: "CMD-001",
    category: "command_injection",
    severity: "critical",
    description: "eval() with dynamic input - arbitrary code execution",
    pattern: /\beval\s*\(/gi,
  },
  {
    id: "CMD-002",
    category: "command_injection",
    severity: "critical",
    description: "exec() call - shell command execution",
    pattern: /\bexec\s*\(/gi,
  },
  {
    id: "CMD-003",
    category: "command_injection",
    severity: "high",
    description: "child_process module usage",
    pattern: /require\s*\(\s*['"]child_process['"]\s*\)|from\s+['"]child_process['"]/gi,
  },
  {
    id: "CMD-004",
    category: "command_injection",
    severity: "high",
    description: "subprocess module usage (Python)",
    pattern: /import\s+subprocess|from\s+subprocess\s+import/gi,
  },
  {
    id: "CMD-005",
    category: "command_injection",
    severity: "critical",
    description: "os.system() call - shell command execution",
    pattern: /os\.system\s*\(/gi,
  },
  {
    id: "CMD-006",
    category: "command_injection",
    severity: "high",
    description: "Shell spawn with dynamic arguments",
    pattern: /spawn\s*\(\s*['"`]?(bash|sh|zsh|cmd|powershell)/gi,
  },
  {
    id: "CMD-007",
    category: "command_injection",
    severity: "medium",
    description: "Function constructor - dynamic code execution",
    pattern: /new\s+Function\s*\(/gi,
  },
  {
    id: "CMD-008",
    category: "command_injection",
    severity: "high",
    description: "execSync - synchronous shell execution",
    pattern: /execSync\s*\(/gi,
  },
];
