export interface CategoryRule {
  category: string;
  keywords: string[];
  weight: number;
  subcategories?: Record<string, string[]>;
}

export const CATEGORY_RULES: CategoryRule[] = [
  {
    category: "wallets",
    weight: 1.0,
    keywords: [
      "wallet", "wallets", "privy", "turnkey", "coinbase", "metamask", "phantom",
      "ledger", "hardware wallet", "custodial", "non-custodial", "keypair",
      "private key", "seed phrase", "mnemonic", "account abstraction",
      "balance", "send sol", "send token", "transfer sol", "transfer token",
      "check balance", "wallet balance"
    ],
    subcategories: {
      "smart-wallets": ["smart wallet", "account abstraction", "aa", "erc-4337"],
      "mpc-wallets": ["mpc", "multi-party", "threshold signature", "tss"],
      "embedded-wallets": ["embedded wallet", "privy", "dynamic"],
      "transfers": ["send sol", "send token", "transfer", "balance"],
    },
  },
  {
    category: "trading",
    weight: 1.0,
    keywords: [
      "trade", "trading", "swap", "dex", "exchange", "amm", "order", "market maker",
      "buy", "sell", "limit order", "spot", "perpetual", "perp", "futures",
      "jupiter", "raydium", "orca", "uniswap", "meteora", "dlmm"
    ],
    subcategories: {
      "dex-integration": ["dex", "swap", "amm", "liquidity pool"],
      "order-management": ["order", "limit", "market order", "stop loss"],
      "market-making": ["market maker", "mm", "liquidity provision"],
    },
  },
  {
    category: "social",
    weight: 0.9,
    keywords: [
      "twitter", "x.com", "discord", "telegram", "social", "post", "tweet",
      "message", "chat", "community", "farcaster", "lens", "bluesky"
    ],
    subcategories: {
      "twitter": ["twitter", "x.com", "tweet"],
      "discord": ["discord", "server", "channel"],
      "telegram": ["telegram", "tg", "bot"],
    },
  },
  {
    category: "defi",
    weight: 1.0,
    keywords: [
      "defi", "staking", "stake", "lending", "borrow", "yield", "farm", "vault",
      "liquidity", "pool", "apy", "apr", "compound", "aave", "marinade", "jito",
      "lido", "protocol", "tvl"
    ],
    subcategories: {
      "staking": ["stake", "staking", "validator", "delegate"],
      "lending": ["lend", "borrow", "collateral", "loan"],
      "yield": ["yield", "farm", "vault", "apy"],
    },
  },
  {
    category: "research",
    weight: 0.8,
    keywords: [
      "research", "analysis", "analyze", "search", "investigate", "intelligence",
      "report", "insight", "discover", "explore", "perplexity", "tavily"
    ],
    subcategories: {
      "market-research": ["market", "competitor", "industry"],
      "on-chain-analysis": ["on-chain", "blockchain", "transaction"],
      "web-search": ["search", "web", "google", "bing"],
    },
  },
  {
    category: "automation",
    weight: 0.9,
    keywords: [
      "automation", "automate", "workflow", "pipeline", "orchestration", "schedule",
      "cron", "trigger", "zapier", "make", "n8n", "task", "job"
    ],
    subcategories: {
      "workflow": ["workflow", "pipeline", "orchestration"],
      "scheduling": ["schedule", "cron", "timer", "trigger"],
      "integration": ["integration", "connect", "webhook"],
    },
  },
  {
    category: "design",
    weight: 0.9,
    keywords: [
      "design", "image", "graphic", "ui", "ux", "figma", "canva", "photoshop",
      "illustrator", "logo", "icon", "mockup", "prototype", "dalle", "midjourney",
      "stable diffusion", "generate image"
    ],
    subcategories: {
      "image-generation": ["generate", "dall-e", "midjourney", "stable diffusion"],
      "ui-design": ["ui", "ux", "figma", "prototype"],
      "graphics": ["graphic", "logo", "icon", "illustration"],
    },
  },
  {
    category: "productivity",
    weight: 0.8,
    keywords: [
      "productivity", "note", "notes", "document", "docs", "notion", "obsidian",
      "calendar", "schedule", "task", "todo", "project", "manage", "organize",
      "spreadsheet", "excel", "google sheets"
    ],
    subcategories: {
      "notes": ["note", "notes", "notion", "obsidian"],
      "documents": ["document", "docs", "word", "google docs"],
      "calendars": ["calendar", "schedule", "meeting"],
      "tasks": ["task", "todo", "project management"],
    },
  },
  {
    category: "data",
    weight: 0.9,
    keywords: [
      "data", "analytics", "metric", "dashboard", "chart", "graph", "visualization",
      "dune", "flipside", "token terminal", "database", "query", "sql", "bigquery"
    ],
    subcategories: {
      "on-chain-data": ["on-chain", "dune", "flipside", "blockchain data"],
      "analytics": ["analytics", "metric", "kpi", "dashboard"],
      "database": ["database", "sql", "query", "storage"],
    },
  },
  {
    category: "prediction",
    weight: 0.9,
    keywords: [
      "prediction", "predict", "forecast", "polymarket", "manifold", "betting",
      "odds", "probability", "market", "outcome"
    ],
    subcategories: {
      "prediction-markets": ["polymarket", "manifold", "prediction market"],
      "forecasting": ["forecast", "predict", "probability"],
    },
  },
  {
    category: "nfts",
    weight: 0.8,
    keywords: [
      "nft", "nfts", "mint nft", "minting", "collection", "deploy token", "create token",
      "token launch", "token creator", "spl token create", "erc-721", "erc-1155", "metaplex",
      "opensea", "tensor", "magic eden", "candy machine"
    ],
    subcategories: {
      "nft-minting": ["mint nft", "minting", "create nft", "candy machine"],
      "token-deployment": ["deploy token", "token launch", "create token", "launch token"],
      "collections": ["collection", "marketplace", "opensea", "magic eden", "tensor"],
    },
  },
  {
    category: "oracles",
    weight: 0.9,
    keywords: [
      "oracle", "price feed", "pyth", "chainlink", "switchboard", "real-time",
      "external data", "off-chain data"
    ],
    subcategories: {
      "price-feeds": ["price", "pyth", "chainlink", "feed"],
      "data-oracles": ["oracle", "external", "off-chain"],
    },
  },
  {
    category: "bridges",
    weight: 0.9,
    keywords: [
      "bridge", "cross-chain", "bridging", "wormhole", "layerzero", "multichain",
      "interoperability", "transfer", "chain"
    ],
    subcategories: {
      "token-bridges": ["bridge", "transfer", "cross-chain"],
      "messaging": ["message", "layerzero", "wormhole"],
    },
  },
  {
    category: "infrastructure",
    weight: 0.7,
    keywords: [
      "infrastructure", "infra", "rpc", "node", "api", "sdk", "name service",
      "sns", "ens", "bonfida", "storage", "ipfs", "arweave", "filecoin"
    ],
    subcategories: {
      "name-services": ["name", "domain", "sns", "ens", "bonfida"],
      "storage": ["storage", "ipfs", "arweave", "filecoin"],
      "rpc-nodes": ["rpc", "node", "provider", "quicknode", "alchemy"],
    },
  },
  {
    category: "coding",
    weight: 0.8,
    keywords: [
      "code", "coding", "programming", "development", "developer", "ide", "vscode",
      "cursor", "git", "github", "debug", "test", "deploy", "ci", "cd", "typescript",
      "python", "rust", "solidity", "anchor", "smart contract"
    ],
    subcategories: {
      "ide": ["ide", "vscode", "cursor", "editor"],
      "version-control": ["git", "github", "gitlab", "version control"],
      "testing": ["test", "testing", "unit test", "integration"],
      "solana-development": ["solana", "anchor", "program", "spl"],
    },
  },
  {
    category: "communication",
    weight: 0.8,
    keywords: [
      "email", "mail", "smtp", "inbox", "outreach", "meeting", "video call",
      "zoom", "teams", "slack", "intercom", "support", "chat", "messaging"
    ],
    subcategories: {
      "email": ["email", "mail", "smtp", "inbox"],
      "meetings": ["meeting", "zoom", "teams", "video call"],
      "team-chat": ["slack", "teams", "chat"],
    },
  },
  {
    category: "marketing",
    weight: 0.8,
    keywords: [
      "marketing", "seo", "copywriting", "advertising", "ads", "campaign",
      "conversion", "cro", "analytics", "growth", "content", "brand"
    ],
    subcategories: {
      "seo": ["seo", "search engine", "ranking", "keyword"],
      "copywriting": ["copy", "copywriting", "headline", "cta"],
      "ads": ["ads", "advertising", "ppc", "campaign"],
    },
  },
  {
    category: "finance",
    weight: 0.8,
    keywords: [
      "finance", "financial", "accounting", "invoice", "expense", "budget",
      "valuation", "stock", "investment", "portfolio", "quickbooks", "stripe"
    ],
    subcategories: {
      "accounting": ["accounting", "bookkeeping", "invoice", "expense"],
      "investment": ["investment", "portfolio", "stock", "valuation"],
      "payments": ["payment", "stripe", "checkout", "billing"],
    },
  },
  {
    category: "legal",
    weight: 0.8,
    keywords: [
      "legal", "contract", "compliance", "terms", "privacy", "gdpr", "kyc",
      "aml", "regulation", "license", "trademark", "ip"
    ],
    subcategories: {
      "contracts": ["contract", "agreement", "terms"],
      "compliance": ["compliance", "gdpr", "kyc", "aml"],
    },
  },
  {
    category: "hr",
    weight: 0.7,
    keywords: [
      "hr", "human resources", "hiring", "recruit", "onboarding", "payroll",
      "employee", "candidate", "interview", "job"
    ],
    subcategories: {
      "recruiting": ["recruit", "hiring", "candidate", "interview"],
      "onboarding": ["onboarding", "employee", "training"],
    },
  },
  {
    category: "experimental",
    weight: 0.5,
    keywords: [
      "experimental", "beta", "alpha", "test", "prototype", "poc", "proof of concept"
    ],
    subcategories: {},
  },
  {
    category: "endpoints",
    weight: 0.9,
    keywords: [
      "endpoint", "api endpoint", "rest api", "tool call", "function call",
      "http", "webhook", "callback"
    ],
    subcategories: {
      "web-crawling": ["crawl", "scrape", "spider"],
      "web-extraction": ["extract", "parse", "scraping"],
      "api-calls": ["api", "rest", "http"],
      "tool-calls": ["tool", "function call", "mcp"],
    },
  },
];

export function getCategoryRule(category: string): CategoryRule | undefined {
  return CATEGORY_RULES.find((r) => r.category === category);
}

export function getAllCategories(): string[] {
  return CATEGORY_RULES.map((r) => r.category);
}
