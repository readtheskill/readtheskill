import type { SecurityRule } from "../types";

// Allowlisted domains that are legitimate
const ALLOWED_DOMAINS = [
  // Code hosting & package registries
  "github.com",
  "githubusercontent.com",
  "raw.githubusercontent.com",
  "gitlab.com",
  "bitbucket.org",
  "npmjs.com",
  "npmjs.org",
  "registry.npmjs.org",
  "pypi.org",
  "pypi.python.org",
  "crates.io",
  "rubygems.org",

  // AI/ML providers
  "docs.anthropic.com",
  "api.anthropic.com",
  "openai.com",
  "api.openai.com",
  "docs.openai.com",
  "huggingface.co",

  // Localhost/examples
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "example.com",
  "example.org",

  // Standards & documentation
  "schema.org",
  "w3.org",
  "mozilla.org",
  "developer.mozilla.org",

  // Infrastructure
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
  "aws.amazon.com",
  "docs.aws.amazon.com",

  // Solana ecosystem
  "solana.com",
  "api.mainnet-beta.solana.com",
  "api.devnet.solana.com",
  "api.testnet.solana.com",
  "solscan.io",
  "solana.fm",
  "explorer.solana.com",
  "helius.dev",
  "helius.xyz",
  "helius-rpc.com",
  "jup.ag",
  "jupiter.ag",
  "station.jup.ag",
  "raydium.io",
  "orca.so",
  "meteora.ag",
  "drift.trade",
  "flash.trade",
  "ranger.finance",
  "marinade.finance",
  "sanctum.so",
  "kamino.finance",
  "solend.fi",
  "marginfi.com",
  "tensor.trade",
  "magiceden.io",
  "phantom.app",
  "solflare.com",
  "backpack.app",
  "birdeye.so",
  "defined.fi",
  "pump.fun",
  "pumpfun.com",
  "clawhub.ai",
  "clawhub.xyz",

  // Ethereum & EVM ecosystem
  "ethereum.org",
  "etherscan.io",
  "polygonscan.com",
  "arbiscan.io",
  "basescan.org",
  "optimistic.etherscan.io",
  "bscscan.com",
  "snowtrace.io",
  "ftmscan.com",
  "infura.io",
  "alchemy.com",
  "quicknode.com",
  "uniswap.org",
  "app.uniswap.org",
  "aave.com",
  "compound.finance",
  "curve.fi",
  "balancer.fi",
  "1inch.io",
  "paraswap.io",
  "lido.fi",
  "opensea.io",
  "blur.io",
  "zora.co",

  // Cross-chain & data
  "coingecko.com",
  "coinmarketcap.com",
  "dexscreener.com",
  "defillama.com",
  "dune.com",
  "nansen.ai",
  "messari.io",
  "chainlist.org",
  "debank.com",
  "zapper.fi",
  "zerion.io",

  // Other blockchains
  "near.org",
  "aptos.dev",
  "sui.io",
  "cosmos.network",
  "terra.money",
  "avalanche.network",
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
      `https?:\\/\\/(?!(?:${allowedDomainsPattern})(?:\\/|$|:|\\s|[\"')\\]>]))[a-zA-Z0-9][a-zA-Z0-9.-]*\\.[a-zA-Z]{2,}[^\\s"'\`\\)\\]]*`,
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
