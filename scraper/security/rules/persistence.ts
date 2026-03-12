import type { SecurityRule } from "../types";

export const persistenceRules: SecurityRule[] = [
  {
    id: "PERSIST-001",
    category: "persistence",
    severity: "high",
    description: "Writing to shell profile files",
    pattern:
      /(?:>>|>)\s*~?\/?\$?(?:HOME\/)?\.(?:bashrc|zshrc|profile|bash_profile|zprofile)/gi,
  },
  {
    id: "PERSIST-002",
    category: "persistence",
    severity: "high",
    description: "Creating login items (macOS)",
    pattern: /osascript\s+[^&|;]*login\s*item|defaults\s+write\s+[^&|;]*LoginItems/gi,
  },
  {
    id: "PERSIST-003",
    category: "persistence",
    severity: "high",
    description: "Creating LaunchAgent/LaunchDaemon (macOS)",
    pattern:
      /(?:LaunchAgents|LaunchDaemons)\/[^\/]+\.plist|launchctl\s+load/gi,
  },
  {
    id: "PERSIST-004",
    category: "persistence",
    severity: "high",
    description: "Creating systemd service",
    pattern: /\/etc\/systemd\/system\/[^\/]+\.service|systemctl\s+enable/gi,
  },
  {
    id: "PERSIST-005",
    category: "persistence",
    severity: "high",
    description: "Windows registry Run key modification",
    pattern: /reg\s+add\s+[^&|;]*\\Run|HKEY_[^\\]*\\.*\\Run/gi,
  },
  {
    id: "PERSIST-006",
    category: "persistence",
    severity: "high",
    description: "Windows Startup folder access",
    pattern: /(?:Startup|Start\s*Menu).*Programs.*Startup|shell:startup/gi,
  },
  {
    id: "PERSIST-007",
    category: "persistence",
    severity: "medium",
    description: "Git hooks installation",
    pattern: /\.git\/hooks\/(?:pre-commit|post-commit|pre-push|post-receive)/gi,
  },
  {
    id: "PERSIST-008",
    category: "persistence",
    severity: "high",
    description: "Modifying agent/AI assistant config files",
    pattern:
      /(?:>>|>)\s*~?\/?\$?(?:HOME\/)?\.(?:claude|cursor|copilot|aider|continue)/gi,
  },
  {
    id: "PERSIST-009",
    category: "persistence",
    severity: "medium",
    description: "npm postinstall script reference",
    pattern: /"(?:postinstall|preinstall|install)"\s*:\s*"[^"]+"/gi,
  },
  {
    id: "PERSIST-010",
    category: "persistence",
    severity: "high",
    description: "Creating init.d script",
    pattern: /\/etc\/init\.d\/[^\/\s]+|update-rc\.d\s+/gi,
  },
];
