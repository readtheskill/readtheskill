import type { SecurityRule } from "../types";

// Allowlisted domains that are legitimate
const ALLOWED_DOMAINS = [
  "github.com",
  "githubusercontent.com",
  "raw.githubusercontent.com",
  "npmjs.com",
  "npmjs.org",
  "registry.npmjs.org",
  "pypi.org",
  "pypi.python.org",
  "docs.anthropic.com",
  "api.anthropic.com",
  "openai.com",
  "api.openai.com",
  "docs.openai.com",
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "example.com",
  "example.org",
  "schema.org",
  "w3.org",
  "mozilla.org",
  "developer.mozilla.org",
  "readtheskill.com",
  "vercel.app",
  "vercel.com",
  "googleapis.com",
  "google.com",
  "docs.google.com",
  "cloudflare.com",
  "unpkg.com",
  "cdn.jsdelivr.net",
  "cdnjs.cloudflare.com",
];

const allowedDomainsPattern = ALLOWED_DOMAINS.map((d) =>
  d.replace(/\./g, "\\.")
).join("|");

export const networkExfilRules: SecurityRule[] = [
  {
    id: "NET-001",
    category: "network_exfil",
    severity: "medium",
    description: "External HTTP request to non-allowlisted URL",
    pattern: new RegExp(
      `https?:\\/\\/(?!(?:${allowedDomainsPattern})(?:\\/|$|:))[a-zA-Z0-9][a-zA-Z0-9.-]*\\.[a-zA-Z]{2,}[^\\s"'\`\\)\\]]*`,
      "gi"
    ),
  },
  {
    id: "NET-002",
    category: "network_exfil",
    severity: "high",
    description: "Hardcoded IP address (non-private, non-localhost)",
    pattern:
      /\b(?!(?:10|127|172\.(?:1[6-9]|2\d|3[01])|192\.168)\.)(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\b/g,
  },
  {
    id: "NET-003",
    category: "network_exfil",
    severity: "medium",
    description: "WebSocket connection to external server",
    pattern: /wss?:\/\/(?!localhost|127\.0\.0\.1)[^\s"'`)\]]+/gi,
  },
  {
    id: "NET-004",
    category: "network_exfil",
    severity: "high",
    description: "fetch() or http request with dynamic URL from variable",
    pattern:
      /(?:fetch|axios|http\.get|http\.post|requests\.(?:get|post))\s*\(\s*[a-zA-Z_]\w*/gi,
  },
  {
    id: "NET-005",
    category: "network_exfil",
    severity: "medium",
    description: "DNS lookup function call",
    pattern: /dns\.(?:lookup|resolve|reverse)\s*\(/gi,
  },
];

export { ALLOWED_DOMAINS };
