import type { SecurityRule } from "../types";

export const supplyChainRules: SecurityRule[] = [
  {
    id: "SUPPLY-001",
    category: "supply_chain",
    severity: "high",
    description: "npm install from recently-created or suspicious package",
    pattern: /npm\s+install\s+(?:--save(?:-dev)?\s+)?[a-z0-9]+-[a-z0-9]+-[a-z0-9]+/gi,
  },
  {
    id: "SUPPLY-002",
    category: "supply_chain",
    severity: "high",
    description: "Adding untrusted package repository",
    pattern:
      /(?:add-apt-repository|yum-config-manager\s+--add-repo|echo\s+[^|]*>>\s*\/etc\/apt\/sources\.list)/gi,
  },
  {
    id: "SUPPLY-003",
    category: "supply_chain",
    severity: "medium",
    description: "git clone from non-GitHub/GitLab source",
    pattern:
      /git\s+clone\s+(?!(?:https?:\/\/)?(?:github\.com|gitlab\.com|bitbucket\.org))[^\s]+/gi,
  },
  {
    id: "SUPPLY-004",
    category: "supply_chain",
    severity: "high",
    description: "npm registry override",
    pattern: /npm\s+(?:config\s+set\s+)?registry\s*[=:]?\s*(?!https?:\/\/registry\.npmjs\.org)/gi,
  },
  {
    id: "SUPPLY-005",
    category: "supply_chain",
    severity: "high",
    description: "pip extra index URL",
    pattern: /pip\s+install\s+[^&|;]*--extra-index-url\s+/gi,
  },
  {
    id: "SUPPLY-006",
    category: "supply_chain",
    severity: "medium",
    description: "Installing specific old version (potential vulnerability exploit)",
    pattern: /(?:npm\s+install|pip\s+install)\s+[^@\s]+@(?:0\.|1\.0\.|2\.0\.)/gi,
  },
  {
    id: "SUPPLY-007",
    category: "supply_chain",
    severity: "high",
    description: "go get from arbitrary URL",
    pattern: /go\s+(?:get|install)\s+(?!github\.com|golang\.org|gopkg\.in)[^\s]+/gi,
  },
  {
    id: "SUPPLY-008",
    category: "supply_chain",
    severity: "medium",
    description: "cargo install from git",
    pattern: /cargo\s+install\s+--git\s+(?!https?:\/\/github\.com)[^\s]+/gi,
  },
];
