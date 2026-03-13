import { BATCH_SKILLS } from "@/data/skills-batch-automation-design-productivity";
import { CLAWHUB_SKILLS } from "@/data/skills-batch-clawhub";
import { COMMUNICATION_SKILLS } from "@/data/skills-batch-communication";
import { DESIGN_EXTENDED_SKILLS } from "@/data/skills-batch-design-extended";
import { FINTOOL_SKILLS } from "@/data/skills-batch-fintool";
import { MARKETING_SKILLS } from "@/data/skills-batch-marketing";
import { ENDPOINT_SKILLS } from "@/data/skills-batch-endpoints";
import { AWESOME_SOLANA_AI_SKILLS } from "@/data/skills-batch-awesome-solana-ai";
import { OFFICE_SKILLS } from "@/data/skills-batch-office";
import { PRODUCTIVITY_EXTENDED_SKILLS } from "@/data/skills-batch-productivity-extended";
import { SOLANA_TOOLKIT_SKILLS } from "@/data/skills-batch-solana-toolkit";

export interface Skill {
    slug: string;
    name: string;
    kind?: "skill" | "endpoint";
    category: Category;
    subcategory?: string;
    description: string;
    source?: "clawhub" | "lobehub" | "github" | "smithery" | "official";
    source_url: string;
    skill_url?: string;
    endpoint_url?: string;
    endpoint_method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    auth_type?: "api-token" | "api-key" | "oauth" | "x402" | "none";
    verified?: boolean;
    framework: string;
    tags: string[];
    body?: string;
    security_score?: number;
    security_badge?: "pass" | "warn" | "review" | "fail";
}

export type Category =
    | "wallets"
    | "trading"
    | "social"
    | "defi"
    | "research"
    | "automation"
    | "design"
    | "productivity"
    | "data"
    | "prediction"
    | "nfts"
    | "oracles"
    | "bridges"
    | "infrastructure"
    | "coding"
    | "communication"
    | "marketing"
    | "finance"
    | "legal"
    | "hr"
    | "experimental"
    | "endpoints";

export const CATEGORIES: Record<
    Category,
    { label: string; description: string; emoji: string }
> = {
    wallets: {
        label: "Wallets",
        description: "Wallet creation and management for AI agents",
        emoji: "💳",
    },
    trading: {
        label: "Trading",
        description: "Token swaps, market making, and trading automation",
        emoji: "📈",
    },
    social: {
        label: "Social",
        description: "Social posting and agent-to-agent communication",
        emoji: "💬",
    },
    defi: {
        label: "DeFi",
        description: "On-chain DeFi actions: staking, lending, bridging",
        emoji: "🏦",
    },
    research: {
        label: "Research",
        description: "Search, analysis, and intelligence gathering",
        emoji: "🔍",
    },
    automation: {
        label: "Automation",
        description: "Task automation and workflow orchestration",
        emoji: "⚙️",
    },
    design: {
        label: "Design",
        description: "Image generation, editing, UI/UX, and creative assets",
        emoji: "🎨",
    },
    productivity: {
        label: "Productivity",
        description: "Notes, docs, email, calendars, and project workflows",
        emoji: "✅",
    },
    data: {
        label: "Data & Analytics",
        description: "Token analytics, on-chain data, market intelligence",
        emoji: "📊",
    },
    prediction: {
        label: "Prediction Markets",
        description: "Prediction market trading and forecasting",
        emoji: "🎲",
    },
    nfts: {
        label: "NFTs & Tokens",
        description: "NFT minting, token deployment, and digital assets",
        emoji: "🎨",
    },
    oracles: {
        label: "Oracles & Price Feeds",
        description: "Real-time price feeds and oracle data",
        emoji: "🔮",
    },
    bridges: {
        label: "Bridges & Cross-Chain",
        description: "Cross-chain bridging and interoperability",
        emoji: "🌉",
    },
    infrastructure: {
        label: "Infrastructure",
        description: "Name services, storage, and protocol utilities",
        emoji: "🛠️",
    },
    coding: {
        label: "Coding & Development",
        description: "IDEs, git, debugging, testing, deployment, and languages",
        emoji: "💻",
    },
    communication: {
        label: "Communication",
        description: "Team chat, email outreach, social media, meetings, and messaging",
        emoji: "📡",
    },
    marketing: {
        label: "Marketing",
        description: "CRO, copywriting, SEO, analytics, and growth engineering skills",
        emoji: "📣",
    },
    finance: {
        label: "Finance & Investment",
        description: "Financial modeling, valuation, stock analysis, and expense management",
        emoji: "💰",
    },
    legal: {
        label: "Legal & Compliance",
        description: "Contract review, NDA generation, and legal document automation",
        emoji: "⚖️",
    },
    hr: {
        label: "HR & Recruitment",
        description: "Hiring, screening, job descriptions, and HR process automation",
        emoji: "👥",
    },
    experimental: {
        label: "Experimental",
        description: "Cutting-edge experiments in agent economics",
        emoji: "🧪",
    },
    endpoints: {
        label: "Endpoints & Tool Calls",
        description: "API endpoints, tool-call surfaces, and non-skill integration primitives",
        emoji: "🔌",
    },
};

export const SKILLS: Skill[] = [
    // ────────────── WALLETS ──────────────
    {
        slug: "coinbase-agentkit",
        name: "Coinbase AgentKit",
        category: "wallets",
        description:
            "Coinbase's toolkit for giving AI agents a crypto wallet and onchain interactions. Framework-agnostic and wallet-agnostic with fee-free stablecoin payments.",
        source_url: "https://github.com/coinbase/agentkit",
        framework: "Coinbase CDP",
        tags: ["wallet", "multi-chain", "stablecoin", "onchain"],
    },
    {
        slug: "privy-wallet",
        name: "Privy Agentic Wallets",
        category: "wallets",
        description:
            "Create and manage agentic wallets with policy-based guardrails for autonomous onchain transactions across Ethereum, Solana, and other chains.",
        source_url: "https://github.com/privy-io/privy-agentic-wallets-skill",
        skill_url:
            "https://github.com/privy-io/privy-agentic-wallets-skill/blob/main/SKILL.md",
        framework: "Privy",
        tags: ["wallet", "agentic", "multi-chain", "policy", "onchain"],
    },
    {
        slug: "mute-swap",
        name: "Mute Swap",
        category: "wallets",
        description:
            "Privacy-first multi-chain swap layer for AI agents. ZK proofs, stealth relayers, and 70+ chain support — the first security and privacy skill for OpenClaw.",
        source_url: "https://muteswap.com",
        framework: "OpenClaw / Virtuals ACP",
        tags: ["privacy", "swap", "multi-chain", "zk-proofs", "stealth"],
    },
    {
        slug: "crossmint-wallet",
        name: "Crossmint Smart Wallet",
        category: "wallets",
        description:
            "Non-custodial smart wallets with dual-key architecture. Owner key stays with the user, agent key operates in a TEE — powered by GOAT SDK.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/wallets/crossmint",
        framework: "GOAT SDK",
        tags: ["wallet", "non-custodial", "dual-key", "tee", "multi-chain"],
    },
    {
        slug: "turnkey-wallet",
        name: "Turnkey Wallet",
        category: "wallets",
        description:
            "Policy-controlled Wallets-as-a-Service for agents. Secure enclaves, delegated signing, spending limits, and contract whitelists.",
        source_url: "https://github.com/tkhq/sdk",
        framework: "Turnkey",
        tags: ["wallet", "policy", "waas", "secure-enclave", "multi-chain"],
    },
    {
        slug: "safe-wallet",
        name: "Safe Wallet",
        category: "wallets",
        description:
            "Multi-signature smart contract wallet management for AI agents. Manage DAO treasuries, protocol permissions, and shared funds via GOAT SDK.",
        source_url: "https://github.com/safe-global/safe-smart-account",
        framework: "GOAT SDK",
        tags: ["wallet", "multi-sig", "dao", "evm", "gnosis"],
    },
    {
        slug: "lit-protocol-wallet",
        name: "Lit Protocol Wallet",
        category: "wallets",
        description:
            "Decentralized key management for agents via Programmable Key Pairs (PKPs). Threshold MPC + TEE security with GOAT SDK integration.",
        source_url: "https://github.com/LIT-Protocol/js-sdk",
        framework: "GOAT SDK",
        tags: ["wallet", "decentralized", "mpc", "pkp", "multi-chain"],
    },
    {
        slug: "dynamic-wallet",
        name: "Dynamic Wallet",
        category: "wallets",
        description:
            "Embedded wallet SDK with social login, multi-chain support, and programmable auth. Drop-in wallet creation for agents and users.",
        source_url: "https://www.dynamic.xyz",
        framework: "Dynamic",
        tags: ["wallet", "embedded", "social-login", "multi-chain"],
    },
    {
        slug: "squads-multisig",
        name: "Squads Multisig",
        category: "wallets",
        description:
            "Solana multisig wallet management. Create and manage Squads multisig accounts, propose and approve transactions programmatically.",
        source_url: "https://github.com/Squads-Protocol/squads-mpl",
        framework: "Solana Agent Kit",
        tags: ["solana", "multisig", "squads", "governance"],
    },
    {
        slug: "goat-wallet-evm",
        name: "GOAT EVM Wallet",
        category: "wallets",
        description:
            "Generic EVM wallet adapter for GOAT SDK. Connect any EVM-compatible wallet to agent plugins.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/wallets/evm",
        framework: "GOAT SDK",
        tags: ["evm", "wallet", "ethereum", "multi-chain"],
        body: `# GOAT EVM Wallet

Generic EVM wallet adapter for the GOAT SDK. Connects any EVM-compatible wallet to all GOAT agent plugins.

## Key Features
- Universal EVM wallet adapter for GOAT SDK plugins
- Works with any EVM chain (Ethereum, Base, Optimism, Arbitrum, etc.)
- Plugs into all GOAT trading, DeFi, and NFT plugins

## Install
\`\`\`bash
npm install @goat-sdk/wallet-evm
\`\`\`

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/wallets/goat-wallet-evm)*`,
    },
    {
        slug: "goat-wallet-solana",
        name: "GOAT Solana Wallet",
        category: "wallets",
        description:
            "Solana wallet adapter for GOAT SDK. Connect Solana wallets to agent plugins for DeFi, NFTs, and trading.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/wallets/solana",
        framework: "GOAT SDK",
        tags: ["solana", "wallet", "goat"],
        body: `# GOAT Solana Wallet

Solana wallet adapter for the GOAT SDK. Connect Solana wallets to all GOAT agent plugins.

## Key Features
- Solana wallet adapter for GOAT SDK plugins
- Works with Jupiter, Meteora, Orca, Tensor, and all Solana plugins
- Keypair and connection management

## Install
\`\`\`bash
npm install @goat-sdk/wallet-solana
\`\`\`

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/wallets/goat-wallet-solana)*`,
    },
    {
        slug: "goat-wallet-viem",
        name: "GOAT Viem Wallet",
        category: "wallets",
        description:
            "Viem-based EVM wallet for GOAT SDK. Use the popular Viem library to power agent wallet operations.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/wallets/viem",
        framework: "GOAT SDK",
        tags: ["evm", "wallet", "viem", "ethereum"],
        body: `# GOAT Viem Wallet

Viem-based EVM wallet adapter for the GOAT SDK. Use the popular Viem TypeScript library for agent wallet operations.

## Key Features
- Built on Viem — type-safe EVM interactions
- Compatible with all GOAT EVM plugins
- Supports any Viem-compatible transport and chain

## Install
\`\`\`bash
npm install @goat-sdk/wallet-viem
\`\`\`

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/wallets/goat-wallet-viem)*`,
    },
    {
        slug: "goat-wallet-cosmos",
        name: "GOAT Cosmos Wallet",
        category: "wallets",
        description:
            "Cosmos ecosystem wallet adapter for GOAT SDK. Connect to Cosmos chains for token operations.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/wallets/cosmos",
        framework: "GOAT SDK",
        tags: ["cosmos", "wallet", "ibc"],
        body: `# GOAT Cosmos Wallet

Cosmos ecosystem wallet adapter for the GOAT SDK. Connect to any Cosmos SDK chain.

## Key Features
- Cosmos wallet adapter for GOAT SDK
- Works with CosmosBank plugin for token transfers
- IBC-compatible chain support

## Install
\`\`\`bash
npm install @goat-sdk/wallet-cosmos
\`\`\`

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/wallets/goat-wallet-cosmos)*`,
    },
    {
        slug: "goat-wallet-starknet",
        name: "GOAT Starknet Wallet",
        category: "wallets",
        description:
            "Starknet L2 wallet adapter for GOAT SDK. Connect to Starknet for trading and token operations.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/wallets/starknet",
        framework: "GOAT SDK",
        tags: ["starknet", "wallet", "l2", "zk"],
        body: `# GOAT Starknet Wallet

Starknet L2 wallet adapter for the GOAT SDK. Connect to Starknet for DeFi and token operations.

## Key Features
- Starknet wallet adapter for GOAT SDK
- Works with Avnu and Starknet Token plugins
- ZK-rollup L2 support

## Install
\`\`\`bash
npm install @goat-sdk/wallet-starknet
\`\`\`

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/wallets/goat-wallet-starknet)*`,
    },
    {
        slug: "goat-wallet-sui",
        name: "GOAT Sui Wallet",
        category: "wallets",
        description:
            "Sui blockchain wallet adapter for GOAT SDK. Connect Sui wallets to agent plugins.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/wallets/sui",
        framework: "GOAT SDK",
        tags: ["sui", "wallet", "move"],
        body: `# GOAT Sui Wallet

Sui blockchain wallet adapter for the GOAT SDK.

## Key Features
- Sui wallet adapter for GOAT SDK plugins
- Move-based blockchain support
- Cross-chain bridging via Mayan plugin

## Install
\`\`\`bash
npm install @goat-sdk/wallet-sui
\`\`\`

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/wallets/goat-wallet-sui)*`,
    },
    {
        slug: "goat-wallet-aptos",
        name: "GOAT Aptos Wallet",
        category: "wallets",
        description:
            "Aptos blockchain wallet adapter for GOAT SDK. Connect Aptos wallets to agent plugins.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/wallets/aptos",
        framework: "GOAT SDK",
        tags: ["aptos", "wallet", "move"],
        body: `# GOAT Aptos Wallet

Aptos blockchain wallet adapter for the GOAT SDK.

## Key Features
- Aptos wallet adapter for GOAT SDK plugins
- Move-based blockchain support

## Install
\`\`\`bash
npm install @goat-sdk/wallet-aptos
\`\`\`

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/wallets/goat-wallet-aptos)*`,
    },
    {
        slug: "goat-wallet-fuel",
        name: "GOAT Fuel Wallet",
        category: "wallets",
        description:
            "Fuel blockchain wallet adapter for GOAT SDK. Connect to the Fuel modular execution layer.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/wallets/fuel",
        framework: "GOAT SDK",
        tags: ["fuel", "wallet", "modular"],
        body: `# GOAT Fuel Wallet

Fuel blockchain wallet adapter for the GOAT SDK.

## Key Features
- Fuel wallet adapter for GOAT SDK plugins
- Modular execution layer support
- Sway/FuelVM compatible

## Install
\`\`\`bash
npm install @goat-sdk/wallet-fuel
\`\`\`

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/wallets/goat-wallet-fuel)*`,
    },
    {
        slug: "goat-wallet-chromia",
        name: "GOAT Chromia Wallet",
        category: "wallets",
        description:
            "Chromia blockchain wallet adapter for GOAT SDK. Connect to the Chromia relational blockchain.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/wallets/chromia",
        framework: "GOAT SDK",
        tags: ["chromia", "wallet", "relational"],
        body: `# GOAT Chromia Wallet

Chromia blockchain wallet adapter for the GOAT SDK.

## Key Features
- Chromia wallet adapter for GOAT SDK plugins
- Relational blockchain support

## Install
\`\`\`bash
npm install @goat-sdk/wallet-chromia
\`\`\`

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/wallets/goat-wallet-chromia)*`,
    },
    {
        slug: "goat-wallet-radix",
        name: "GOAT Radix Wallet",
        category: "wallets",
        description:
            "Radix DLT wallet adapter for GOAT SDK. Connect to the Radix distributed ledger.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/wallets/radix",
        framework: "GOAT SDK",
        tags: ["radix", "wallet", "dlt"],
        body: `# GOAT Radix Wallet

Radix DLT wallet adapter for the GOAT SDK.

## Key Features
- Radix wallet adapter for GOAT SDK plugins
- Distributed ledger technology support

## Install
\`\`\`bash
npm install @goat-sdk/wallet-radix
\`\`\`

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/wallets/goat-wallet-radix)*`,
    },

    // ────────────── TRADING ──────────────
    {
        slug: "jupiter-swap",
        name: "Jupiter Swap",
        category: "trading",
        description:
            "Direct token swaps on Solana via Jupiter aggregator. Best price routing across all Solana DEXs including Pump.fun, Raydium, Orca, and Meteora.",
        source_url: "https://github.com/sendaifun/solana-agent-kit",
        framework: "Solana Agent Kit",
        tags: ["solana", "swap", "jupiter", "dex"],
    },
    {
        slug: "aster-skills",
        name: "Aster DEX Trading",
        category: "trading",
        description:
            "Agent skills for Aster Finance Futures API. Authentication, trading, market data, account management, and WebSocket streams — compatible with OpenClaw.",
        source_url: "https://github.com/asterdex/aster-skills-hub",
        framework: "AgentSkills / OpenClaw",
        tags: ["futures", "trading", "websocket", "perpetuals"],
    },
    {
        slug: "aster-mcp",
        name: "Aster MCP Server",
        category: "trading",
        description:
            "MCP server with 35+ tools for Aster spot and futures trading. Market data, order management, leverage, and account info — use with Cursor, Claude, or any MCP client.",
        source_url: "https://github.com/asterdex/aster-mcp",
        framework: "MCP",
        tags: ["mcp", "futures", "spot", "trading", "cursor"],
        body: `# Aster MCP Server

MCP server providing 35+ tools for Aster DEX spot and futures trading.

## Agent Usage

### Install
\`\`\`json
{
  "mcpServers": {
    "aster": {
      "command": "npx",
      "args": ["-y", "aster-mcp"],
      "env": { "ASTER_API_KEY": "<your-key>", "ASTER_SECRET_KEY": "<your-secret>" }
    }
  }
}
\`\`\`

### Key Tools
- \`get_market_data\` — fetch real-time price, volume, and order book for a trading pair
- \`place_spot_order\` — place a spot buy/sell order (market or limit)
- \`place_futures_order\` — open/close futures positions with leverage
- \`get_open_orders\` — list all open orders
- \`cancel_order\` — cancel a specific order by ID
- \`get_account_info\` — check balances, margin, and P&L
- \`set_leverage\` — adjust leverage for a futures pair

### Example Prompt
> "Buy 0.5 ETH at market price on Aster spot, then check my account balance."

---
*Source: [asterdex/aster-mcp](https://github.com/asterdex/aster-mcp)*`,
    },
    {
        slug: "binance-skills",
        name: "Binance AI Skills Hub",
        category: "trading",
        description:
            "7 agent skills from Binance: spot trading, wallet analysis, token info, market rankings, meme tracking, trading signals, and contract auditing.",
        source_url: "https://www.binance.com/en/support/announcement/introducing-binance-ai-agent-skills-hub",
        framework: "Binance",
        tags: ["binance", "spot", "signals", "meme", "audit"],
    },
    {
        slug: "bybit-trading",
        name: "Bybit AI Trading",
        category: "trading",
        description:
            "Trade on Bybit using natural language. Spot, derivatives, earn products, and account management. Works with Claude, ChatGPT, OpenClaw, Cursor, and any AI assistant.",
        source_url: "https://github.com/bybit-exchange/skills",
        skill_url: "https://raw.githubusercontent.com/bybit-exchange/skills/main/SKILL.md",
        verified: true,
        framework: "AgentSkills",
        tags: ["bybit", "trading", "spot", "derivatives", "perpetuals", "earn"],
    },
    {
        slug: "opensea-cli",
        name: "OpenSea CLI & SDK",
        category: "trading",
        description:
            "Query NFTs, listings, swaps, and more from the command line or programmatically. Full SDK with collections, tokens, events, and search.",
        source_url: "https://github.com/ProjectOpenSea/opensea-cli",
        framework: "OpenSea",
        tags: ["nft", "opensea", "collections", "marketplace"],
    },
    {
        slug: "bankrbot",
        name: "BankrBot",
        category: "trading",
        description:
            "Full trading stack for AI agents. Market analysis, order execution, and portfolio management across multiple exchanges.",
        source_url: "https://clawhub.ai/skills/bankrbot",
        framework: "ClawHub",
        tags: ["trading", "multi-exchange", "portfolio"],
    },
    {
        slug: "polyclaw",
        name: "Polyclaw",
        category: "trading",
        description:
            "Polymarket trading skill. Place and manage prediction market positions programmatically.",
        source_url: "https://clawhub.ai/skills/polyclaw",
        framework: "ClawHub",
        tags: ["prediction-markets", "polymarket", "trading"],
    },
    {
        slug: "four-meme",
        name: "Four.meme Agentic Skill",
        category: "trading",
        description:
            "Create and trade meme tokens on BNB Chain directly inside Claude, OpenClaw, and other AI agents. From prompt to position, from idea to on-chain.",
        source_url: "https://four.meme",
        framework: "Four.meme / OpenClaw",
        tags: ["bnb-chain", "meme", "token-launch", "trading"],
    },
    {
        slug: "clanker",
        name: "Clanker SDK",
        category: "trading",
        description:
            "Deploy production-ready ERC-20 tokens with built-in Uniswap V4 liquidity pools on Base. TypeScript SDK for AI agents and Farcaster bots.",
        source_url: "https://github.com/clankerdev/clanker-sdk",
        framework: "Clanker",
        tags: ["base", "token-launch", "uniswap", "farcaster", "erc20"],
    },
    {
        slug: "bags",
        name: "Bags",
        category: "trading",
        description:
            "Solana token launchpad where AI agents earn fees as collaborators. Launch tokens, claim trading fees, and trade on bonding curves — all via API.",
        source_url: "https://bags.fm",
        skill_url: "https://bags.fm/skill.md",
        framework: "Bags / Moltbook",
        tags: ["solana", "token-launch", "fees", "bonding-curve", "agent-earnings"],
    },
    {
        slug: "jupiter-ultra",
        name: "Jupiter Ultra",
        category: "trading",
        description: "Ultra-fast swaps with Privy wallets on Solana via Jupiter Ultra API. Optimized for speed and best execution.",
        source_url: "https://github.com/sendaifun/solana-agent-kit",
        framework: "Solana Agent Kit",
        tags: ["solana", "swap", "jupiter", "fast"],
    },
    {
        slug: "jupiter-limit-orders",
        name: "Jupiter Limit Orders",
        category: "trading",
        description: "Create and manage limit orders on Solana via Jupiter. Set price targets, partial fills, and expiration.",
        source_url: "https://github.com/sendaifun/solana-agent-kit",
        framework: "Solana Agent Kit / ElizaOS",
        tags: ["solana", "limit-orders", "jupiter"],
    },
    {
        slug: "jupiter-dca",
        name: "Jupiter DCA",
        category: "trading",
        description: "Dollar-cost averaging on Solana via Jupiter. Automate recurring purchases at set intervals.",
        source_url: "https://github.com/sendaifun/solana-agent-kit",
        framework: "Solana Agent Kit",
        tags: ["solana", "dca", "jupiter", "automation"],
    },
    {
        slug: "jupiter-api-integration",
        name: "Jupiter API Integration",
        category: "trading",
        description:
            "Comprehensive Jupiter API skill covering Ultra Swap, Lend, Perps, Trigger, Recurring, Tokens, Price, Portfolio, Prediction Markets, Send, Studio, Lock, and Routing.",
        source_url: "https://github.com/jup-ag/agent-skills/tree/main/skills/integrating-jupiter",
        skill_url: "https://github.com/jup-ag/agent-skills/blob/main/skills/integrating-jupiter/SKILL.md",
        framework: "Jupiter",
        tags: ["solana", "jupiter", "swap", "perps", "lend", "dca", "limit-orders", "price", "portfolio", "prediction-markets"],
    },
    {
        slug: "jupiter-lend",
        name: "Jupiter Lend Protocol",
        category: "defi",
        description:
            "Interact with Jupiter Lend (powered by Fluid Protocol). Read-only SDK for querying pools and markets, write SDK for deposits, withdrawals, borrowing, and vault operations on Solana.",
        source_url: "https://github.com/jup-ag/agent-skills/tree/main/skills/jupiter-lend",
        skill_url: "https://github.com/jup-ag/agent-skills/blob/main/skills/jupiter-lend/SKILL.md",
        framework: "Jupiter",
        tags: ["solana", "jupiter", "lend", "borrow", "earn", "defi", "vaults", "jltoken"],
    },
    {
        slug: "raydium-swap",
        name: "Raydium Swap",
        category: "trading",
        description: "Direct AMM swaps on Raydium, Solana's leading AMM. Deep liquidity and fast execution.",
        source_url: "https://github.com/sendaifun/solana-agent-kit",
        framework: "Solana Agent Kit / ElizaOS",
        tags: ["solana", "swap", "raydium", "amm"],
    },
    {
        slug: "raydium-liquidity",
        name: "Raydium Liquidity",
        category: "trading",
        description: "Add and remove liquidity on Raydium pools. Manage LP positions and earn trading fees.",
        source_url: "https://github.com/sendaifun/solana-agent-kit",
        framework: "Solana Agent Kit",
        tags: ["solana", "liquidity", "raydium", "lp"],
    },
    {
        slug: "orca-whirlpools",
        name: "Orca Whirlpools",
        category: "trading",
        description: "Concentrated liquidity swaps on Orca Whirlpools. Capital-efficient trading on Solana.",
        source_url: "https://github.com/orca-so/whirlpools",
        framework: "Solana Agent Kit / GOAT SDK",
        tags: ["solana", "concentrated-liquidity", "orca"],
    },
    {
        slug: "meteora-swap",
        name: "Meteora Swap",
        category: "trading",
        description: "Meteora AMM integration for Solana. Dynamic liquidity pools and DLMM trading.",
        source_url: "https://github.com/sendaifun/solana-agent-kit",
        framework: "Solana Agent Kit",
        tags: ["solana", "swap", "meteora", "dlmm"],
    },
    {
        slug: "uniswap-v3",
        name: "Uniswap V3",
        category: "trading",
        description: "Swap tokens on Uniswap V3 via GOAT SDK. Concentrated liquidity on Ethereum and EVM chains.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/uniswap",
        framework: "GOAT SDK / LangChain",
        tags: ["evm", "swap", "uniswap", "concentrated-liquidity"],
    },
    {
        slug: "1inch-aggregator",
        name: "1inch Aggregator",
        category: "trading",
        description: "DEX aggregation across EVM chains via GOAT SDK. Best rates from multiple DEXes in a single transaction.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/1inch",
        framework: "GOAT SDK",
        tags: ["evm", "aggregator", "1inch", "multi-dex"],
    },
    {
        slug: "okx-dex",
        name: "OKX DEX Aggregator",
        category: "trading",
        description: "Multi-chain swap aggregator via OKX DEX API. Cross-chain swaps across 20+ blockchains.",
        source_url: "https://lobehub.com/plugins/okx-dex",
        framework: "OpenClaw / LobeHub",
        tags: ["multi-chain", "aggregator", "okx", "cross-chain"],
    },

    {
        slug: "dflow-swap",
        name: "DFlow Swap",
        category: "trading",
        description: "Fast swaps via DFlow API on Solana. Payment-for-order-flow optimized execution.",
        source_url: "https://github.com/sendaifun/solana-agent-kit",
        framework: "Solana Agent Kit",
        tags: ["solana", "swap", "dflow", "pfof"],
    },
    {
        slug: "bankrbot-trading",
        name: "Bankr",
        category: "trading",
        description:
            "Comprehensive agent CLI + REST API. Trading, portfolio, Polymarket betting, leverage (50x), NFTs, token deployment, and automation across Base, Solana, Ethereum, Polygon.",
        source_url: "https://github.com/BankrBot/skills",
        framework: "OpenClaw",
        tags: ["multi-chain", "trading", "polymarket", "leverage", "nfts"],
    },
    {
        slug: "solana-trader-v2",
        name: "Solana Trader V2",
        category: "trading",
        description: "Comprehensive Solana trading via LobeHub. Real-time prices, swap execution, and portfolio management.",
        source_url: "https://lobehub.com/plugins/solana-trader",
        framework: "OpenClaw / LobeHub",
        tags: ["solana", "trading", "portfolio", "prices"],
    },
    {
        slug: "phoenix-dex",
        name: "Phoenix DEX",
        category: "trading",
        description: "Phoenix order book trading on Solana. Fully on-chain CLOB with limit orders and market orders.",
        source_url: "https://github.com/Ellipsis-Labs/phoenix-v1",
        framework: "Solana Agent Kit",
        tags: ["solana", "order-book", "phoenix", "clob"],
    },
    {
        slug: "openbook-dex",
        name: "OpenBook",
        category: "trading",
        description: "OpenBook (Serum successor) order book trading on Solana. Community-run on-chain order book.",
        source_url: "https://github.com/openbook-dex/program",
        framework: "Solana Agent Kit",
        tags: ["solana", "order-book", "openbook", "serum"],
    },
    {
        slug: "jito-mev",
        name: "Jito MEV Protection",
        category: "trading",
        description: "MEV-protected transactions on Solana via Jito bundles. Front-running protection and priority execution.",
        source_url: "https://github.com/jito-foundation/jito-ts",
        framework: "Solana Agent Kit",
        tags: ["solana", "mev", "jito", "bundles"],
    },
    {
        slug: "goat-0x",
        name: "0x Swap (GOAT)",
        category: "trading",
        description: "Token swaps via 0x aggregator. Best price routing across EVM DEXes with GOAT SDK plugin.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/0x",
        framework: "GOAT SDK",
        tags: ["evm", "swap", "0x", "aggregator"],
        body: `# 0x Swap (GOAT)

Get quotes and swap tokens via 0x DEX aggregator on EVM chains.

## Key Features
- DEX aggregation across EVM chains
- Best price routing from multiple liquidity sources
- GOAT SDK plugin — \`@goat-sdk/plugin-0x\`

## Install
\`\`\`bash
npm install @goat-sdk/plugin-0x
\`\`\`

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/trading/goat-0x)*`,
    },
    {
        slug: "goat-avnu",
        name: "Avnu (GOAT)",
        category: "trading",
        description: "Swap tokens on Starknet via AVNU aggregator. GOAT SDK plugin for Starknet DeFi.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/avnu",
        framework: "GOAT SDK",
        tags: ["starknet", "swap", "avnu", "l2"],
        body: `# Avnu (GOAT)

Swap tokens on Starknet via the AVNU DEX aggregator.

## Key Features
- Starknet DEX aggregation
- Best price routing on Starknet L2
- GOAT SDK plugin — \`@goat-sdk/plugin-avnu\`

## Install
\`\`\`bash
npm install @goat-sdk/plugin-avnu
\`\`\`

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/trading/goat-avnu)*`,
    },
    {
        slug: "goat-balmy",
        name: "Balmy (GOAT)",
        category: "trading",
        description: "Swap tokens on Balmy protocol via GOAT SDK. Multi-chain token swaps.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/balmy",
        framework: "GOAT SDK",
        tags: ["evm", "swap", "balmy", "multi-chain"],
        body: `# Balmy (GOAT)

Swap tokens on Balmy protocol.

## Key Features
- Multi-chain token swaps
- GOAT SDK plugin — \`@goat-sdk/plugin-balmy\`

## Install
\`\`\`bash
npm install @goat-sdk/plugin-balmy
\`\`\`

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/trading/goat-balmy)*`,
    },
    {
        slug: "goat-enso",
        name: "Enso (GOAT)",
        category: "trading",
        description: "Optimal token routing between assets via Enso. Find the best path across DeFi protocols.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/enso",
        framework: "GOAT SDK",
        tags: ["evm", "routing", "enso", "aggregator"],
        body: `# Enso (GOAT)

Find optimal token routing between assets via Enso Finance.

## Key Features
- Smart routing across DeFi protocols
- Optimal path discovery for complex swaps
- GOAT SDK plugin — \`@goat-sdk/plugin-enso\`

## Install
\`\`\`bash
npm install @goat-sdk/plugin-enso
\`\`\`

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/trading/goat-enso)*`,
    },
    {
        slug: "goat-jupiter",
        name: "Jupiter (GOAT)",
        category: "trading",
        description: "Swap tokens on Jupiter via GOAT SDK. Solana DEX aggregation with best price routing.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/jupiter",
        framework: "GOAT SDK",
        tags: ["solana", "swap", "jupiter", "aggregator"],
        body: `# Jupiter (GOAT)

Swap tokens on Solana via Jupiter aggregator using the GOAT SDK plugin.

## Key Features
- Solana DEX aggregation via Jupiter
- Best price routing across all Solana DEXes
- GOAT SDK plugin — \`@goat-sdk/plugin-jupiter\`

## Install
\`\`\`bash
npm install @goat-sdk/plugin-jupiter
\`\`\`

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/trading/goat-jupiter)*`,
    },
    {
        slug: "goat-kim",
        name: "KIM Exchange (GOAT)",
        category: "trading",
        description: "Swap tokens on KIM exchange via GOAT SDK plugin.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/kim",
        framework: "GOAT SDK",
        tags: ["evm", "swap", "kim", "dex"],
        body: `# KIM Exchange (GOAT)

Swap tokens on KIM exchange.

## Key Features
- Token swaps on KIM DEX
- GOAT SDK plugin — \`@goat-sdk/plugin-kim\`

## Install
\`\`\`bash
npm install @goat-sdk/plugin-kim
\`\`\`

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/trading/goat-kim)*`,
    },
    {
        slug: "goat-orderly-network",
        name: "Orderly Network (GOAT)",
        category: "trading",
        description: "Deposit/withdraw USDC, create orders, and manage positions on Orderly Network. EVM + Solana.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/orderly-network",
        framework: "GOAT SDK",
        tags: ["evm", "solana", "perps", "orderbook", "orderly"],
        body: `# Orderly Network (GOAT)

Deposit/withdraw USDC, create orders, and close positions on Orderly Network.

## Key Features
- Orderbook-based perpetual futures
- EVM + Solana support
- Deposit, withdraw, and position management
- GOAT SDK plugin — \`@goat-sdk/plugin-orderly-network\`

## Install
\`\`\`bash
npm install @goat-sdk/plugin-orderly-network
\`\`\`

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/trading/goat-orderly-network)*`,
    },
    {
        slug: "goat-curves",
        name: "Curves (GOAT)",
        category: "trading",
        description: "Buy/sell Curves tokens, manage ERC20 conversions, and mint tokens via GOAT SDK.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/curves",
        framework: "GOAT SDK",
        tags: ["evm", "social-tokens", "curves", "bonding-curve"],
        body: `# Curves (GOAT)

Buy and sell Curves tokens, manage ERC20 conversions, and mint tokens.

## Key Features
- Bonding curve token trading
- ERC20 token conversion management
- GOAT SDK plugin — \`@goat-sdk/plugin-curves\`

## Install
\`\`\`bash
npm install @goat-sdk/plugin-curves
\`\`\`

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/trading/goat-curves)*`,
    },
    {
        slug: "goat-plunderswap",
        name: "PlunderSwap (GOAT)",
        category: "trading",
        description: "Currency exchange on Zilliqa via PlunderSwap. GOAT SDK plugin.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/plunderswap",
        framework: "GOAT SDK",
        tags: ["zilliqa", "swap", "plunderswap", "dex"],
        body: `# PlunderSwap (GOAT)

Currency exchange on Zilliqa via PlunderSwap.

## Key Features
- Token swaps on Zilliqa blockchain
- GOAT SDK plugin — \`@goat-sdk/plugin-plunderswap\`

## Install
\`\`\`bash
npm install @goat-sdk/plugin-plunderswap
\`\`\`

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/trading/goat-plunderswap)*`,
    },

    // ────────────── SOCIAL ──────────────
    {
        slug: "moltbook",
        name: "Moltbook",
        category: "social",
        description:
            "Agent-to-agent social network. Post updates, follow other agents, and build a social graph across the agent ecosystem.",
        source_url: "https://clawhub.ai/skills/moltbook",
        framework: "ClawHub",
        tags: ["social", "agent-network", "posting"],
    },
    {
        slug: "twitter-x",
        name: "Twitter/X Posting",
        category: "social",
        description:
            "Post to Twitter/X from AI agents. Compose tweets, reply to threads, search mentions, and manage social presence.",
        source_url: "https://lobehub.com/plugins/twitter",
        framework: "LobeHub",
        tags: ["twitter", "social", "posting", "distribution"],
    },
    {
        slug: "hey-lol",
        name: "hey.lol",
        category: "social",
        description:
            "Agent social platform with built-in monetization. Post content, earn USDC via paywalls, paid DMs, tips, and x402 services on Solana and Base.",
        source_url: "https://hey.lol/skill.md",
        skill_url: "https://hey.lol/skill.md",
        framework: "hey.lol",
        tags: ["social", "monetization", "x402", "solana", "base", "agent-network"],
    },

    // ────────────── COMMUNICATION ──────────────
    {
        slug: "agentmail",
        name: "AgentMail SDK",
        category: "communication",
        subcategory: "email-outreach",
        description:
            "API-first email platform for AI agents with inbox creation, message send/reply, threads, drafts, attachments, and multi-tenant pods.",
        source_url: "https://github.com/agentmail-to/agentmail-skills",
        skill_url:
            "https://raw.githubusercontent.com/agentmail-to/agentmail-skills/main/agentmail/SKILL.md",
        framework: "AgentMail",
        tags: ["email", "inboxes", "threads", "outreach", "automation", "api"],
        verified: true,
    },

    // ────────────── DEFI ──────────────
    {
        slug: "minara",
        name: "Minara Skills",
        category: "defi",
        description:
            "All-in-one digital finance for AI agents. Built-in wallet, crypto & stock trading, perps, transfers, and market insights across 13 chains.",
        source_url: "https://github.com/Minara-AI/skills",
        framework: "OpenClaw / ClawHub",
        tags: ["multi-chain", "wallet", "trading", "perps", "stocks"],
    },
    {
        slug: "solana-agent-kit",
        name: "Solana Agent Kit",
        category: "defi",
        description:
            "Connect any AI agent to Solana protocols. 60+ actions: swap, stake, lend, bridge, create tokens, manage NFTs, perpetuals trading.",
        source_url: "https://github.com/sendaifun/solana-agent-kit",
        framework: "SendAI",
        tags: ["solana", "defi", "staking", "lending", "nft", "perpetuals"],
    },
    {
        slug: "solana-dev-skill",
        name: "Solana Dev Skill",
        category: "defi",
        description:
            "Official Solana development playbook. Framework-kit-first approach covering wallet connection, Anchor/Pinocchio programs, testing, and security.",
        source_url: "https://solana.com/SKILL.md",
        skill_url: "https://solana.com/SKILL.md",
        framework: "Solana Foundation",
        tags: ["solana", "development", "anchor", "pinocchio", "testing"],
    },
    {
        slug: "kamino-finance",
        name: "Kamino Finance",
        category: "defi",
        description:
            "Lending, borrowing, and leverage on Solana. Concentrated liquidity management and yield optimization.",
        source_url: "https://github.com/Kamino-Finance",
        framework: "Solana Agent Kit",
        tags: ["solana", "lending", "borrowing", "leverage", "clmm"],
    },
    {
        slug: "lulo-aggregator",
        name: "Lulo Aggregator",
        category: "defi",
        description:
            "Lending yield aggregation on Solana — finds best APR across protocols. Verified GOAT SDK plugin + SAK integration.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/lulo",
        framework: "GOAT SDK / Solana Agent Kit",
        tags: ["solana", "lending", "yield", "aggregator"],
    },
    {
        slug: "marinade-staking",
        name: "Marinade Staking",
        category: "defi",
        description:
            "Liquid staking on Solana via Marinade Finance. Stake SOL for mSOL with automated validator delegation.",
        source_url: "https://github.com/marinade-finance",
        framework: "Solana Agent Kit / MCP",
        tags: ["solana", "staking", "liquid-staking", "msol"],
    },
    {
        slug: "sanctum-lst",
        name: "Sanctum LST",
        category: "defi",
        description:
            "Liquid staking token management on Solana. Prices, APY, TVL, swaps, and Infinite Pool liquidity — 7 SAK actions.",
        source_url: "https://github.com/sendaifun/solana-agent-kit",
        framework: "Solana Agent Kit",
        tags: ["solana", "lst", "staking", "yield"],
    },
    {
        slug: "jito-staking",
        name: "Jito Staking",
        category: "defi",
        description:
            "MEV-boosted liquid staking on Solana via Jito. Stake SOL for JitoSOL with MEV rewards from Jito bundles.",
        source_url: "https://github.com/jito-foundation",
        framework: "Solana Agent Kit",
        tags: ["solana", "staking", "mev", "jitosol"],
    },
    {
        slug: "drift-protocol",
        name: "Drift Protocol",
        category: "defi",
        description:
            "Perpetuals, spot trading, lending, borrowing, and vaults on Solana. 15+ SAK code examples with full API.",
        source_url: "https://github.com/drift-labs/protocol-v2",
        framework: "Solana Agent Kit / ElizaOS",
        tags: ["solana", "perps", "lending", "vaults", "trading"],
    },
    {
        slug: "ranger-finance",
        name: "Ranger Finance",
        category: "defi",
        description:
            "Solana perps aggregator across Drift, Flash, Adrena, Jupiter. Has dedicated ranger-agent-kit on GitHub.",
        source_url: "https://github.com/ranger-finance/ranger-agent-kit",
        framework: "Solana Agent Kit",
        tags: ["solana", "perps", "aggregator", "ranger"],
    },
    {
        slug: "flash-trade",
        name: "Flash Trade",
        category: "defi",
        description:
            "Perpetual futures on Solana via Flash Trade. Directly integrated into SAK DeFi plugin with flashOpenTrade/flashCloseTrade.",
        source_url: "https://github.com/sendaifun/solana-agent-kit",
        framework: "Solana Agent Kit",
        tags: ["solana", "perps", "flash", "leverage"],
    },
    {
        slug: "goat-balancer",
        name: "Balancer (GOAT)",
        category: "defi",
        description: "Swap tokens and provide liquidity on Balancer via GOAT SDK. EVM weighted pools and liquidity.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/balancer",
        framework: "GOAT SDK",
        tags: ["evm", "liquidity", "balancer", "amm"],
        body: `# Balancer (GOAT)

Swap tokens and provide liquidity on Balancer.

## Key Features
- Weighted pool trading and liquidity provision
- EVM multi-chain support
- GOAT SDK plugin — \`@goat-sdk/plugin-balancer\`

## Install
\`\`\`bash
npm install @goat-sdk/plugin-balancer
\`\`\`

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/defi/goat-balancer)*`,
    },
    {
        slug: "goat-renzo",
        name: "Renzo (GOAT)",
        category: "defi",
        description: "Liquid restaking via Renzo protocol. Create restaking positions with GOAT SDK.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/renzo",
        framework: "GOAT SDK",
        tags: ["evm", "restaking", "renzo", "eigenlayer"],
        body: `# Renzo (GOAT)

Create positions on Renzo protocol for liquid restaking.

## Key Features
- EigenLayer liquid restaking
- Position management via GOAT SDK
- GOAT SDK plugin — \`@goat-sdk/plugin-renzo\`

## Install
\`\`\`bash
npm install @goat-sdk/plugin-renzo
\`\`\`

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/defi/goat-renzo)*`,
    },
    {
        slug: "goat-superfluid",
        name: "Superfluid (GOAT)",
        category: "defi",
        description: "Create real-time token streams with Superfluid. Programmable money flows via GOAT SDK.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/superfluid",
        framework: "GOAT SDK",
        tags: ["evm", "streaming", "superfluid", "payments"],
        body: `# Superfluid (GOAT)

Create real-time token streams with Superfluid protocol.

## Key Features
- Programmable money streams — per-second payments
- Create, update, and delete token flows
- GOAT SDK plugin — \`@goat-sdk/plugin-superfluid\`

## Install
\`\`\`bash
npm install @goat-sdk/plugin-superfluid
\`\`\`

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/defi/goat-superfluid)*`,
    },
    {
        slug: "goat-velodrome",
        name: "Velodrome (GOAT)",
        category: "defi",
        description: "Create positions on Velodrome DEX on Optimism. Liquidity provision via GOAT SDK.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/velodrome",
        framework: "GOAT SDK",
        tags: ["optimism", "liquidity", "velodrome", "amm"],
        body: `# Velodrome (GOAT)

Create positions on Velodrome, the leading DEX on Optimism.

## Key Features
- Liquidity provision on Optimism
- Position management
- GOAT SDK plugin — \`@goat-sdk/plugin-velodrome\`

## Install
\`\`\`bash
npm install @goat-sdk/plugin-velodrome
\`\`\`

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/defi/goat-velodrome)*`,
    },
    {
        slug: "goat-ionic",
        name: "Ionic (GOAT)",
        category: "defi",
        description: "Borrow and lend on Ionic protocol via GOAT SDK. EVM lending markets.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/ionic",
        framework: "GOAT SDK",
        tags: ["evm", "lending", "ionic", "borrowing"],
        body: `# Ionic (GOAT)

Borrow and lend on Ionic protocol.

## Key Features
- Lending and borrowing on EVM chains
- Supply and borrow position management
- GOAT SDK plugin — \`@goat-sdk/plugin-ionic\`

## Install
\`\`\`bash
npm install @goat-sdk/plugin-ionic
\`\`\`

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/defi/goat-ionic)*`,
    },
    {
        slug: "goat-ironclad",
        name: "Ironclad (GOAT)",
        category: "defi",
        description: "Create lending positions on Ironclad protocol via GOAT SDK.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/ironclad",
        framework: "GOAT SDK",
        tags: ["evm", "lending", "ironclad"],
        body: `# Ironclad (GOAT)

Create lending positions on Ironclad protocol.

## Key Features
- Lending and borrowing
- Position management via GOAT SDK
- GOAT SDK plugin — \`@goat-sdk/plugin-ironclad\`

## Install
\`\`\`bash
npm install @goat-sdk/plugin-ironclad
\`\`\`

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/defi/goat-ironclad)*`,
    },

    // ────────────── RESEARCH ──────────────
    {
        slug: "x-research",
        name: "X Research",
        category: "research",
        description:
            "X/Twitter research skill for Claude Code and OpenClaw. Agentic search, thread following, watchlists, and sourced briefings.",
        source_url: "https://github.com/rohunvora/x-research-skill",
        framework: "Claude Code / OpenClaw",
        tags: ["twitter", "research", "search", "threads", "watchlist"],
    },

    // ────────────── AUTOMATION ──────────────
    {
        slug: "just-fucking-cancel",
        name: "Just Fucking Cancel",
        category: "automation",
        description:
            "Claude Code skill that audits your subscriptions from bank CSVs and cancels them via browser automation. Your data never leaves your computer.",
        source_url: "https://github.com/rohunvora/just-fucking-cancel",
        framework: "Claude Code",
        tags: ["subscriptions", "browser-automation", "privacy", "finance"],
    },
    {
        slug: "agent-browser",
        name: "Vercel Agent Browser",
        category: "automation",
        description:
            "Headless browser automation CLI for AI agents from Vercel. Point it at any URL — it explores pages, clicks buttons, fills forms, tests edge cases, and outputs severity-rated reports.",
        source_url: "https://github.com/vercel-labs/agent-browser",
        framework: "Vercel",
        tags: ["browser", "testing", "qa", "dogfooding", "automation"],
    },
    {
        slug: "byterover-openclaw",
        name: "ByteRover for OpenClaw",
        category: "automation",
        subcategory: "agent-memory",
        description:
            "Long-term memory skill for OpenClaw agents using ByteRover context trees. Supports query/curate workflows, optional cloud sync, and provider setup.",
        source_url: "https://github.com/openclaw/skills/tree/main/skills/byteroverinc/byterover",
        skill_url: "https://raw.githubusercontent.com/openclaw/skills/main/skills/byteroverinc/byterover/SKILL.md",
        framework: "OpenClaw / ByteRover",
        tags: ["memory", "context", "openclaw", "knowledge-management", "brv"],
    },
    {
        slug: "openclaw-daily-ops",
        name: "OpenClaw Daily Ops",
        category: "automation",
        subcategory: "cost-monitoring",
        description:
            "Daily cost reporting plus zombie session cleanup for OpenClaw deployments. Generates Discord reports and removes stale high-context sessions on a cron schedule.",
        source_url: "https://github.com/oh-ashen-one/openclaw-daily-ops",
        skill_url: "https://github.com/oh-ashen-one/openclaw-daily-ops/blob/main/SKILL.md",
        framework: "OpenClaw",
        tags: ["openclaw", "cost-reporting", "cron", "discord", "session-cleanup"],
    },

    // ────────────── DATA & ANALYTICS ──────────────
    {
        slug: "birdeye-analytics",
        name: "Birdeye Analytics",
        category: "data",
        description:
            "Token analytics, prices, OHLCV, trending tokens on Solana. Verified GOAT SDK plugin with npm package.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/birdeye",
        framework: "GOAT SDK / Solana Agent Kit",
        tags: ["solana", "analytics", "prices", "ohlcv", "trending"],
    },
    {
        slug: "dexscreener",
        name: "DexScreener",
        category: "data",
        description:
            "Multi-chain token charts, prices, and pair data. Verified GOAT SDK plugin for real-time DEX analytics.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/dexscreener",
        framework: "GOAT SDK",
        tags: ["multi-chain", "charts", "dex", "pairs", "analytics"],
    },
    {
        slug: "dune-analytics",
        name: "Dune Analytics",
        category: "data",
        description:
            "On-chain data queries across 100+ blockchains. REST API, Python/TypeScript SDKs, and MCP server for AI agents.",
        source_url: "https://github.com/duneanalytics",
        framework: "MCP / OpenClaw",
        tags: ["multi-chain", "sql", "analytics", "on-chain-data"],
    },
    {
        slug: "fear-greed-index",
        name: "Fear & Greed Index",
        category: "data",
        description:
            "Crypto sentiment gauge with real-time Fear & Greed data. LobeHub marketplace plugin for AI agents.",
        source_url: "https://lobehub.com/plugins/fear-greed",
        framework: "OpenClaw / LobeHub",
        tags: ["sentiment", "fear-greed", "market-data"],
    },
    {
        slug: "aixbt-alpha",
        name: "AIXBT Find Alpha",
        category: "data",
        subcategory: "market-intelligence",
        description:
            "Official AIXBT agent skill for crypto momentum intelligence, market signals, project discovery, and x402-compatible API workflows.",
        source_url: "https://docs.aixbt.tech/builders/skill",
        skill_url: "https://aixbt.tech/skill.md",
        framework: "AIXBT",
        tags: ["crypto", "alpha", "signals", "momentum", "market-intelligence", "x402", "api"],
    },
    {
        slug: "token-metadata",
        name: "Token Metadata",
        category: "data",
        description:
            "Fetch token info, logos, socials, and metadata on Solana. Built into Solana Agent Kit.",
        source_url: "https://github.com/sendaifun/solana-agent-kit",
        framework: "Solana Agent Kit",
        tags: ["solana", "metadata", "token-info", "logos"],
    },
    {
        slug: "goat-coinmarketcap",
        name: "CoinMarketCap (GOAT)",
        category: "data",
        description: "Retrieve coin data via CoinMarketCap API. GOAT SDK plugin for market data and rankings.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/coinmarketcap",
        framework: "GOAT SDK",
        tags: ["market-data", "coinmarketcap", "rankings", "prices"],
        body: `# CoinMarketCap (GOAT)\n\nRetrieve coin data via CoinMarketCap API.\n\n## Key Features\n- Market cap rankings and coin metadata\n- Price data and historical quotes\n- GOAT SDK plugin — \`@goat-sdk/plugin-coinmarketcap\`\n\n## Install\n\`\`\`bash\nnpm install @goat-sdk/plugin-coinmarketcap\n\`\`\`\n\n---\n*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/data/goat-coinmarketcap)*`,
    },
    {
        slug: "goat-coingecko",
        name: "CoinGecko (GOAT)",
        category: "data",
        description: "Access coin information through CoinGecko API. GOAT SDK plugin for prices, charts, and metadata.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/coingecko",
        framework: "GOAT SDK",
        tags: ["market-data", "coingecko", "prices", "charts"],
        body: `# CoinGecko (GOAT)\n\nAccess coin information through CoinGecko API.\n\n## Key Features\n- Token prices, market data, and charts\n- Coin metadata and trending tokens\n- GOAT SDK plugin — \`@goat-sdk/plugin-coingecko\`\n\n## Install\n\`\`\`bash\nnpm install @goat-sdk/plugin-coingecko\n\`\`\`\n\n---\n*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/data/goat-coingecko)*`,
    },
    {
        slug: "goat-etherscan",
        name: "Etherscan (GOAT)",
        category: "data",
        description: "Retrieve transaction information via Etherscan API. GOAT SDK plugin for EVM chain data.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/etherscan",
        framework: "GOAT SDK",
        tags: ["evm", "etherscan", "transactions", "explorer"],
        body: `# Etherscan (GOAT)\n\nRetrieve transaction information via Etherscan API.\n\n## Key Features\n- Transaction history and details\n- Contract verification and ABI lookup\n- GOAT SDK plugin — \`@goat-sdk/plugin-etherscan\`\n\n## Install\n\`\`\`bash\nnpm install @goat-sdk/plugin-etherscan\n\`\`\`\n\n---\n*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/data/goat-etherscan)*`,
    },
    {
        slug: "goat-nansen",
        name: "Nansen (GOAT)",
        category: "data",
        description: "Access on-chain analytics data using Nansen API. Smart money tracking via GOAT SDK.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/nansen",
        framework: "GOAT SDK",
        tags: ["analytics", "nansen", "smart-money", "on-chain"],
        body: `# Nansen (GOAT)\n\nAccess on-chain analytics data using Nansen API.\n\n## Key Features\n- Smart money tracking and wallet labels\n- On-chain analytics and flow analysis\n- GOAT SDK plugin — \`@goat-sdk/plugin-nansen\`\n\n## Install\n\`\`\`bash\nnpm install @goat-sdk/plugin-nansen\n\`\`\`\n\n---\n*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/data/goat-nansen)*`,
    },

    // ────────────── PREDICTION MARKETS ──────────────
    {
        slug: "polymarket-goat",
        name: "Polymarket (GOAT)",
        category: "prediction",
        description: "Prediction market trading via GOAT SDK. Search markets, check odds, place bets on Polygon.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/polymarket",
        framework: "GOAT SDK",
        tags: ["polygon", "prediction", "polymarket", "betting"],
    },
    {
        slug: "manifold-markets",
        name: "Manifold Markets",
        category: "prediction",
        description: "Play money prediction market API. Create and trade markets on any question.",
        source_url: "https://api.manifold.markets",
        framework: "Custom",
        tags: ["prediction", "play-money", "manifold"],
    },
    {
        slug: "pumpmarket",
        name: "PumpMarket",
        category: "prediction",
        description: "Predict which pump.fun tokens will graduate. Solana-based prediction markets for memecoins.",
        source_url: "https://pumpmarket.fun",
        framework: "Custom",
        tags: ["solana", "prediction", "pump-fun", "memecoins"],
    },
    {
        slug: "goat-betswirl",
        name: "BetSwirl (GOAT)",
        category: "prediction",
        description: "Play on-chain casino games via BetSwirl. GOAT SDK plugin for provably fair gaming.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/betswirl",
        framework: "GOAT SDK",
        tags: ["evm", "gaming", "betswirl", "casino"],
        body: `# BetSwirl (GOAT)\n\nPlay on-chain casino games via BetSwirl.\n\n## Key Features\n- Provably fair on-chain gaming\n- Multiple game types\n- GOAT SDK plugin — \`@goat-sdk/plugin-betswirl\`\n\n## Install\n\`\`\`bash\nnpm install @goat-sdk/plugin-betswirl\n\`\`\`\n\n---\n*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/prediction/goat-betswirl)*`,
    },

    // ────────────── NFTS & TOKENS ──────────────
    {
        slug: "metaplex-nft",
        name: "Metaplex NFT",
        category: "nfts",
        description: "Mint, manage, and deploy NFT collections on Solana via Metaplex. Built into Solana Agent Kit.",
        source_url: "https://github.com/sendaifun/solana-agent-kit",
        framework: "Solana Agent Kit / ElizaOS",
        tags: ["solana", "nft", "metaplex", "collections"],
    },
    {
        slug: "token-deployment-solana",
        name: "Token Deployment (Solana)",
        category: "nfts",
        description: "Deploy SPL tokens on Solana. Token2022 support, custom decimals, authorities, and initial supply.",
        source_url: "https://github.com/sendaifun/solana-agent-kit",
        framework: "Solana Agent Kit",
        tags: ["solana", "token", "spl", "deployment"],
    },
    {
        slug: "pumpfun-launch",
        name: "Pump.fun Launch",
        category: "nfts",
        description: "Launch tokens on pump.fun via PumpPortal. Built into Solana Agent Kit DeFi integration.",
        source_url: "https://github.com/sendaifun/solana-agent-kit",
        framework: "Solana Agent Kit",
        tags: ["solana", "pump-fun", "token-launch", "memecoin"],
    },
    {
        slug: "tensor-nft",
        name: "Tensor NFT",
        category: "nfts",
        description: "Solana NFT marketplace via GOAT SDK. Trade compressed and regular NFTs.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/tensor",
        framework: "GOAT SDK",
        tags: ["solana", "nft", "marketplace", "tensor"],
    },
    {
        slug: "magic-eden",
        name: "Magic Eden",
        category: "nfts",
        description: "Multi-chain NFT marketplace via GOAT SDK. Solana-native with cross-chain expansion.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/solana-magiceden",
        framework: "GOAT SDK",
        tags: ["solana", "nft", "marketplace", "magic-eden"],
    },
    {
        slug: "spl-token-manager",
        name: "SPL Token Manager",
        category: "nfts",
        description: "Full SPL token operations on Solana. Transfer, airdrop, balance checks, and account management.",
        source_url: "https://github.com/sendaifun/solana-agent-kit",
        framework: "Solana Agent Kit",
        tags: ["solana", "spl", "token", "transfer"],
    },
    {
        slug: "erc721-manager",
        name: "ERC721 Manager",
        category: "nfts",
        description: "NFT operations on EVM chains via GOAT SDK. Mint, transfer, and manage ERC721 tokens.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/erc721",
        framework: "GOAT SDK",
        tags: ["evm", "nft", "erc721", "ethereum"],
    },
    {
        slug: "goat-erc1155",
        name: "ERC1155 Manager (GOAT)",
        category: "nfts",
        description: "Interact with ERC1155 multi-token standard via GOAT SDK. Manage fungible and non-fungible tokens in one contract.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/erc1155",
        framework: "GOAT SDK",
        tags: ["evm", "nft", "erc1155", "multi-token"],
        body: `# ERC1155 Manager (GOAT)\n\nInteract with ERC1155 multi-token standard on EVM chains.\n\n## Key Features\n- Manage fungible + non-fungible tokens in one contract\n- Batch transfers and balance queries\n- GOAT SDK plugin — \`@goat-sdk/plugin-erc1155\`\n\n## Install\n\`\`\`bash\nnpm install @goat-sdk/plugin-erc1155\n\`\`\`\n\n---\n*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/nfts/goat-erc1155)*`,
    },
    {
        slug: "goat-solana-nfts",
        name: "Solana NFTs (GOAT)",
        category: "nfts",
        description: "Get NFT information on Solana via GOAT SDK. Query collections, metadata, and ownership.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/solana-nfts",
        framework: "GOAT SDK",
        tags: ["solana", "nft", "metadata", "collections"],
        body: `# Solana NFTs (GOAT)\n\nGet NFT information on Solana via GOAT SDK.\n\n## Key Features\n- Query NFT metadata and collections\n- Ownership and attribute lookup\n- GOAT SDK plugin — \`@goat-sdk/plugin-solana-nfts\`\n\n## Install\n\`\`\`bash\nnpm install @goat-sdk/plugin-solana-nfts\n\`\`\`\n\n---\n*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/nfts/goat-solana-nfts)*`,
    },
    {
        slug: "goat-crossmint-checkout",
        name: "Crossmint Headless Checkout (GOAT)",
        category: "nfts",
        description: "Purchase any NFT on any chain using Crossmint headless checkout. Credit card and crypto payments via GOAT SDK.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/crossmint-headless-checkout",
        framework: "GOAT SDK",
        tags: ["nft", "checkout", "crossmint", "multi-chain"],
        body: `# Crossmint Headless Checkout (GOAT)\n\nPurchase any NFT on any chain using Crossmint headless checkout.\n\n## Key Features\n- Buy NFTs with credit card or crypto\n- Multi-chain support\n- Headless — no UI required\n- GOAT SDK plugin — \`@goat-sdk/plugin-crossmint-headless-checkout\`\n\n## Install\n\`\`\`bash\nnpm install @goat-sdk/plugin-crossmint-headless-checkout\n\`\`\`\n\n---\n*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/nfts/goat-crossmint-checkout)*`,
    },

    // ────────────── ORACLES & PRICE FEEDS ──────────────
    {
        slug: "pyth-network",
        name: "Pyth Network",
        category: "oracles",
        description: "Real-time price feeds on Solana and 50+ chains. Built into Solana Agent Kit with code examples.",
        source_url: "https://github.com/sendaifun/solana-agent-kit",
        framework: "Solana Agent Kit",
        tags: ["solana", "multi-chain", "oracle", "prices", "pyth"],
    },
    {
        slug: "switchboard-oracle",
        name: "Switchboard Oracle",
        category: "oracles",
        description: "Permissionless oracle feeds and VRF on Solana. Feed simulation built into Solana Agent Kit.",
        source_url: "https://github.com/sendaifun/solana-agent-kit",
        framework: "Solana Agent Kit",
        tags: ["solana", "oracle", "vrf", "switchboard"],
    },
    {
        slug: "allora-intelligence",
        name: "Allora Intelligence",
        category: "oracles",
        description: "AI-powered price predictions and inference. Verified GOAT SDK plugin + SAK integration.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/allora",
        framework: "GOAT SDK / Solana Agent Kit",
        tags: ["multi-chain", "ai", "prediction", "allora"],
    },

    // ────────────── BRIDGES & CROSS-CHAIN ──────────────
    {
        slug: "wormhole-bridge",
        name: "Wormhole Bridge",
        category: "bridges",
        description: "Cross-chain bridging and messaging via Wormhole. Built into Solana Agent Kit.",
        source_url: "https://github.com/sendaifun/solana-agent-kit",
        framework: "Solana Agent Kit",
        tags: ["multi-chain", "bridge", "wormhole", "cross-chain"],
    },
    {
        slug: "debridge-dln",
        name: "deBridge DLN",
        category: "bridges",
        description: "Cross-chain swaps via deBridge DLN. Verified GOAT SDK plugin + SAK integration with code examples.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/debridge",
        framework: "GOAT SDK / Solana Agent Kit",
        tags: ["multi-chain", "bridge", "debridge", "cross-chain"],
    },
    {
        slug: "goat-lifi",
        name: "LiFi Bridge (GOAT)",
        category: "bridges",
        description: "Bridge tokens across chains using LiFi. Get bridge quotes and execute cross-chain transfers via GOAT SDK.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/lifi",
        framework: "GOAT SDK",
        tags: ["multi-chain", "bridge", "lifi", "cross-chain"],
        body: `# LiFi Bridge (GOAT)\n\nBridge tokens across chains using LiFi aggregator.\n\n## Key Features\n- Cross-chain bridge aggregation\n- Get quotes and execute transfers\n- Multi-chain — EVM, Solana, and more\n- GOAT SDK plugin — \`@goat-sdk/plugin-lifi\`\n\n## Install\n\`\`\`bash\nnpm install @goat-sdk/plugin-lifi\n\`\`\`\n\n---\n*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/bridges/goat-lifi)*`,
    },
    {
        slug: "goat-mayan",
        name: "Mayan Bridge (GOAT)",
        category: "bridges",
        description: "Cross-chain token swaps via Mayan. Supports Solana, EVM, and SUI chains via GOAT SDK.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/mayan",
        framework: "GOAT SDK",
        tags: ["multi-chain", "bridge", "mayan", "solana", "sui"],
        body: `# Mayan Bridge (GOAT)\n\nCross-chain token swaps using Mayan SDK.\n\n## Key Features\n- Solana, EVM, and SUI support\n- Cross-chain swap execution\n- GOAT SDK plugin — \`@goat-sdk/plugin-mayan\`\n\n## Install\n\`\`\`bash\nnpm install @goat-sdk/plugin-mayan\n\`\`\`\n\n---\n*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/bridges/goat-mayan)*`,
    },
    {
        slug: "goat-zerodev-global-address",
        name: "ZeroDev Global Address (GOAT)",
        category: "bridges",
        description: "Create global addresses on ZeroDev for cross-chain smart wallets. Receive on any chain via GOAT SDK.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/zerodev-global-address",
        framework: "GOAT SDK",
        tags: ["multi-chain", "smart-wallet", "zerodev", "cross-chain"],
        body: `# ZeroDev Global Address (GOAT)\n\nCreate global addresses on ZeroDev for cross-chain smart wallets.\n\n## Key Features\n- Single address receivable on any chain\n- Smart wallet abstraction\n- GOAT SDK plugin — \`@goat-sdk/plugin-zerodev-global-address\`\n\n## Install\n\`\`\`bash\nnpm install @goat-sdk/plugin-zerodev-global-address\n\`\`\`\n\n---\n*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/bridges/goat-zerodev-global-address)*`,
    },

    // ────────────── SOCIAL (additional) ──────────────
    {
        slug: "farcaster-neynar",
        name: "Farcaster (Neynar)",
        category: "social",
        description: "Decentralized social protocol via GOAT SDK. Post, read, and engage on Farcaster.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/farcaster",
        framework: "GOAT SDK",
        tags: ["base", "social", "farcaster", "decentralized"],
    },
    {
        slug: "solana-blinks",
        name: "Blinks (Solana Actions)",
        category: "social",
        description: "Shareable blockchain actions on Solana. Built into SAK Blinks plugin.",
        source_url: "https://github.com/sendaifun/solana-agent-kit",
        framework: "Solana Agent Kit",
        tags: ["solana", "blinks", "actions", "shareable"],
    },

    // ────────────── INFRASTRUCTURE & UTILITIES ──────────────
    {
        slug: "ens-resolution",
        name: "ENS Resolution",
        category: "infrastructure",
        description: "Resolve Ethereum Name Service domains via GOAT SDK. Forward and reverse resolution.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/ens",
        framework: "GOAT SDK",
        tags: ["ethereum", "ens", "domains", "identity"],
    },
    {
        slug: "sns-solana",
        name: "SNS (Solana Name Service)",
        category: "infrastructure",
        description: "Resolve .sol domains via GOAT SDK + SAK. Register, resolve, and manage Solana names.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/sns",
        framework: "GOAT SDK / Solana Agent Kit",
        tags: ["solana", "sns", "domains", "identity"],
    },
    {
        slug: "irys-arweave",
        name: "Irys (Arweave Storage)",
        category: "infrastructure",
        description: "Permanent decentralized storage via Irys/Arweave. Verified GOAT SDK plugin.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/irys",
        framework: "GOAT SDK",
        tags: ["storage", "arweave", "irys", "permanent"],
    },
    {
        slug: "light-protocol-zk",
        name: "Light Protocol ZK",
        category: "infrastructure",
        description: "Zero-knowledge compression on Solana. ZK compressed airdrops and state compression via SAK.",
        source_url: "https://github.com/sendaifun/solana-agent-kit",
        framework: "Solana Agent Kit",
        tags: ["solana", "zk", "compression", "airdrop"],
    },
    {
        slug: "bnbchain-mcp",
        name: "BNB Chain MCP Skill",
        category: "infrastructure",
        description:
            "BNB Chain MCP server skill for blocks, transactions, contract reads/writes, token and NFT transfers, ERC-8004 agent registration, and Greenfield tools.",
        source_url: "https://github.com/bnb-chain/bnbchain-skills",
        skill_url:
            "https://raw.githubusercontent.com/bnb-chain/bnbchain-skills/main/skills/bnbchain-mcp-skill/SKILL.md",
        framework: "MCP",
        tags: ["bnb-chain", "mcp", "evm", "greenfield", "erc-8004", "wallet"],
    },
    {
        slug: "goat-cosmosbank",
        name: "CosmosBank (GOAT)",
        category: "infrastructure",
        description: "Interact with Cosmos tokens via the bank module. Send, query balances, and manage Cosmos assets via GOAT SDK.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/cosmosbank",
        framework: "GOAT SDK",
        tags: ["cosmos", "tokens", "bank", "ibc"],
        body: `# CosmosBank (GOAT)\n\nInteract with Cosmos tokens via the bank module.\n\n## Key Features\n- Send tokens and query balances on Cosmos chains\n- Bank module integration\n- GOAT SDK plugin — \`@goat-sdk/plugin-cosmosbank\`\n\n## Install\n\`\`\`bash\nnpm install @goat-sdk/plugin-cosmosbank\n\`\`\`\n\n---\n*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/infrastructure/goat-cosmosbank)*`,
    },
    {
        slug: "goat-dpsn",
        name: "DPSN (GOAT)",
        category: "infrastructure",
        description: "Push-based real-time data streams for agents. Subscribe to on-chain events via GOAT SDK.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/dpsn",
        framework: "GOAT SDK",
        tags: ["data-streams", "real-time", "dpsn", "events"],
        body: `# DPSN (GOAT)\n\nPush-based real-time data streams for agents.\n\n## Key Features\n- Subscribe to real-time on-chain events\n- Push-based data delivery\n- GOAT SDK plugin — \`@goat-sdk/dpsn-plugin\`\n\n## Install\n\`\`\`bash\nnpm install @goat-sdk/dpsn-plugin\n\`\`\`\n\n---\n*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/infrastructure/goat-dpsn)*`,
    },
    {
        slug: "goat-jsonrpc",
        name: "JSON RPC (GOAT)",
        category: "infrastructure",
        description: "Call any JSON RPC endpoint from an agent. Universal RPC interface via GOAT SDK.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/jsonrpc",
        framework: "GOAT SDK",
        tags: ["rpc", "json-rpc", "infrastructure", "universal"],
        body: `# JSON RPC (GOAT)\n\nCall any JSON RPC endpoint from an agent.\n\n## Key Features\n- Universal JSON RPC interface\n- Works with any RPC-compatible chain\n- GOAT SDK plugin — \`@goat-sdk/plugin-jsonrpc\`\n\n## Install\n\`\`\`bash\nnpm install @goat-sdk/plugin-jsonrpc\n\`\`\`\n\n---\n*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/infrastructure/goat-jsonrpc)*`,
    },
    {
        slug: "goat-modespray",
        name: "ModeSpray (GOAT)",
        category: "infrastructure",
        description: "Distribute assets to multiple recipients in a single transaction on Mode Network via GOAT SDK.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/modespray",
        framework: "GOAT SDK",
        tags: ["mode", "distribution", "batch-transfer", "evm"],
        body: `# ModeSpray (GOAT)\n\nSpray (distribute) assets to multiple recipients in a single transaction.\n\n## Key Features\n- Batch token distribution on Mode Network\n- Single transaction for multiple recipients\n- GOAT SDK plugin — \`@goat-sdk/plugin-modespray\`\n\n## Install\n\`\`\`bash\nnpm install @goat-sdk/plugin-modespray\n\`\`\`\n\n---\n*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/infrastructure/goat-modespray)*`,
    },
    {
        slug: "goat-opengradient",
        name: "OpenGradient (GOAT)",
        category: "infrastructure",
        description: "On-chain ML model inference and LLM interactions. Run models, completions, and chat via GOAT SDK.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/opengradient",
        framework: "GOAT SDK",
        tags: ["ml", "inference", "llm", "on-chain"],
        body: `# OpenGradient (GOAT)\n\nOn-chain ML model inference and LLM interactions.\n\n## Key Features\n- Run ML models on-chain\n- LLM completions and chat\n- Model inference via smart contracts\n- GOAT SDK plugin — \`@goat-sdk/plugin-opengradient\`\n\n## Install\n\`\`\`bash\nnpm install @goat-sdk/plugin-opengradient\n\`\`\`\n\n---\n*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/infrastructure/goat-opengradient)*`,
    },
    {
        slug: "goat-rugcheck",
        name: "Rugcheck (GOAT)",
        category: "infrastructure",
        description: "Check SPL token safety on Rugcheck. Validate Solana tokens before trading via GOAT SDK.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/rugcheck",
        framework: "GOAT SDK",
        tags: ["solana", "security", "rugcheck", "validation"],
        body: `# Rugcheck (GOAT)\n\nCheck SPL token validity and safety on Rugcheck.\n\n## Key Features\n- Token safety scoring on Solana\n- Rug pull detection and risk assessment\n- GOAT SDK plugin — \`@goat-sdk/plugin-rugcheck\`\n\n## Install\n\`\`\`bash\nnpm install @goat-sdk/plugin-rugcheck\n\`\`\`\n\n---\n*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/infrastructure/goat-rugcheck)*`,
    },
    {
        slug: "goat-hedgey",
        name: "Hedgey (GOAT)",
        category: "defi",
        description: "Claim rewards on Hedgey Finance. Token vesting and rewards via GOAT SDK.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/hedgey",
        framework: "GOAT SDK",
        tags: ["evm", "rewards", "hedgey", "vesting"],
        body: `# Hedgey (GOAT)\n\nClaim rewards on Hedgey Finance.\n\n## Key Features\n- Token vesting and rewards claiming\n- GOAT SDK plugin — \`@goat-sdk/plugin-hedgey\`\n\n## Install\n\`\`\`bash\nnpm install @goat-sdk/plugin-hedgey\n\`\`\`\n\n---\n*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/defi/goat-hedgey)*`,
    },
    {
        slug: "goat-merkl",
        name: "Merkl (GOAT)",
        category: "defi",
        description: "Claim rewards from Merkl platform. DeFi incentive distribution via GOAT SDK.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/merkl",
        framework: "GOAT SDK",
        tags: ["evm", "rewards", "merkl", "incentives"],
        body: `# Merkl (GOAT)\n\nClaim rewards from Merkl platform.\n\n## Key Features\n- DeFi incentive and reward claiming\n- Multi-protocol reward distribution\n- GOAT SDK plugin — \`@goat-sdk/plugin-merkl\`\n\n## Install\n\`\`\`bash\nnpm install @goat-sdk/plugin-merkl\n\`\`\`\n\n---\n*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/defi/goat-merkl)*`,
    },
    {
        slug: "goat-mode-governance",
        name: "Mode Governance (GOAT)",
        category: "infrastructure",
        description: "Create governance proposals on Mode Network via GOAT SDK.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/mode-governance",
        framework: "GOAT SDK",
        tags: ["mode", "governance", "proposals", "dao"],
        body: `# Mode Governance (GOAT)\n\nCreate governance proposals on Mode Network.\n\n## Key Features\n- Submit governance proposals\n- Mode Network DAO integration\n- GOAT SDK plugin — \`@goat-sdk/plugin-mode-governance\`\n\n## Install\n\`\`\`bash\nnpm install @goat-sdk/plugin-mode-governance\n\`\`\`\n\n---\n*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/infrastructure/goat-mode-governance)*`,
    },
    {
        slug: "goat-mode-voting",
        name: "Mode Voting (GOAT)",
        category: "infrastructure",
        description: "Vote on governance proposals on Mode Network via GOAT SDK.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/mode-voting",
        framework: "GOAT SDK",
        tags: ["mode", "governance", "voting", "dao"],
        body: `# Mode Voting (GOAT)\n\nVote on governance proposals on Mode Network.\n\n## Key Features\n- Cast votes on active proposals\n- Mode Network DAO participation\n- GOAT SDK plugin — \`@goat-sdk/plugin-mode-voting\`\n\n## Install\n\`\`\`bash\nnpm install @goat-sdk/plugin-mode-voting\n\`\`\`\n\n---\n*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/infrastructure/goat-mode-voting)*`,
    },
    {
        slug: "goat-push-governance",
        name: "Push Governance (GOAT)",
        category: "infrastructure",
        description: "Delegate voting power and manage PUSH governance on PushChain via GOAT SDK.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/push-governance",
        framework: "GOAT SDK",
        tags: ["push", "governance", "delegation", "dao"],
        body: `# Push Governance (GOAT)\n\nDelegate voting power and check PUSH balances on PushChain.\n\n## Key Features\n- Delegate voting power\n- Check PUSH balances and voting power\n- GOAT SDK plugin — \`@goat-sdk/plugin-push-governance\`\n\n## Install\n\`\`\`bash\nnpm install @goat-sdk/plugin-push-governance\n\`\`\`\n\n---\n*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/infrastructure/goat-push-governance)*`,
    },
    {
        slug: "goat-worldstore",
        name: "Worldstore (GOAT)",
        category: "infrastructure",
        description: "Purchase physical assets on-chain via Worldstore. E-commerce for agents via GOAT SDK.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/worldstore",
        framework: "GOAT SDK",
        tags: ["ecommerce", "physical-assets", "worldstore"],
        body: `# Worldstore (GOAT)\n\nPurchase physical assets on Worldstore.\n\n## Key Features\n- Buy physical goods on-chain\n- Agent e-commerce integration\n- GOAT SDK plugin — \`@goat-sdk/plugin-worldstore\`\n\n## Install\n\`\`\`bash\nnpm install @goat-sdk/plugin-worldstore\n\`\`\`\n\n---\n*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/infrastructure/goat-worldstore)*`,
    },
    {
        slug: "goat-synth-api",
        name: "Synth API (GOAT)",
        category: "data",
        description: "Obtain synthetic price data through Synth Subnet API. GOAT SDK plugin for price feeds.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/synth-api",
        framework: "GOAT SDK",
        tags: ["prices", "synthetic", "synth", "data-feeds"],
        body: `# Synth API (GOAT)\n\nObtain synthetic price data through Synth Subnet API.\n\n## Key Features\n- Synthetic price data feeds\n- Subnet-based price oracle\n- GOAT SDK plugin — \`@goat-sdk/plugin-synth-api\`\n\n## Install\n\`\`\`bash\nnpm install @goat-sdk/plugin-synth-api\n\`\`\`\n\n---\n*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/data/goat-synth-api)*`,
    },
    {
        slug: "goat-starknet-token",
        name: "Starknet Token (GOAT)",
        category: "trading",
        description: "Interact with Starknet tokens via GOAT SDK. Token transfers and operations on Starknet L2.",
        source_url: "https://github.com/goat-sdk/goat/tree/main/typescript/packages/plugins/starknet-token",
        framework: "GOAT SDK",
        tags: ["starknet", "tokens", "l2", "transfers"],
        body: `# Starknet Token (GOAT)\n\nInteract with Starknet tokens.\n\n## Key Features\n- Token transfers on Starknet L2\n- Balance queries and token operations\n- GOAT SDK plugin — \`@goat-sdk/plugin-starknet-token\`\n\n## Install\n\`\`\`bash\nnpm install @goat-sdk/plugin-starknet-token\n\`\`\`\n\n---\n*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/trading/goat-starknet-token)*`,
    },

    // ────────────── AWESOME SOLANA AI — NEW SKILLS ──────────────
    {
        slug: "clawpump-skill",
        name: "ClawPump",
        category: "nfts",
        description: "Gasless and self-funded token launches on pump.fun with dev buys, instant graduation, and 65% trading fee revenue share.",
        source_url: "https://www.clawpump.tech/skill.md",
        framework: "Custom",
        tags: ["solana", "token-launch", "pump-fun", "revenue"],
    },
    {
        slug: "clawpump-arbitrage",
        name: "ClawPump Arbitrage",
        category: "trading",
        description: "Multi-DEX arbitrage API for AI agents. 11 DEX quote aggregation, roundtrip and bridge strategies, ready-to-sign tx bundles.",
        source_url: "https://clawpump.tech/arbitrage.md",
        framework: "Custom",
        tags: ["solana", "arbitrage", "dex", "mev"],
    },
    {
        slug: "sp3nd-agent",
        name: "SP3ND Agent",
        category: "automation",
        description: "Buy products from Amazon using USDC on Solana. Fully autonomous via x402 payment protocol. 0% fee, no KYC.",
        source_url: "https://github.com/kent-x1/sp3nd-agent-skill",
        framework: "Custom",
        tags: ["solana", "commerce", "usdc", "amazon", "x402"],
    },
    {
        slug: "dflow-phantom-connect",
        name: "DFlow Phantom Connect",
        category: "trading",
        description: "DFlow + Phantom Connect for wallet-connected Solana apps. Swaps, prediction markets, Proof KYC verification.",
        source_url: "https://github.com/DFlowProtocol/dflow_phantom-connect-skill",
        framework: "Custom",
        tags: ["solana", "dflow", "phantom", "wallet-connect"],
    },
    {
        slug: "pinocchio-skill",
        name: "Pinocchio Development",
        category: "infrastructure",
        description: "Zero-dependency zero-copy framework for high-performance Solana programs. 88-95% compute unit reduction.",
        source_url: "https://github.com/sendaifun/skills/tree/main/skills/pinocchio-development",
        framework: "sendaifun/skills",
        tags: ["solana", "programs", "performance", "pinocchio"],
    },
    {
        slug: "vulnhunter-skill",
        name: "VulnHunter Security",
        category: "infrastructure",
        description: "Security vulnerability detection, dangerous API hunting, and variant analysis across Solana codebases.",
        source_url: "https://github.com/sendaifun/skills/tree/main/skills/vulnhunter",
        framework: "sendaifun/skills",
        tags: ["solana", "security", "audit", "vulnerability"],
    },
    {
        slug: "code-recon-skill",
        name: "CodeRecon Audit",
        category: "infrastructure",
        description: "Deep architectural context building for security audits. Trust boundary mapping and vulnerability analysis.",
        source_url: "https://github.com/sendaifun/skills/tree/main/skills/zz-code-recon",
        framework: "sendaifun/skills",
        tags: ["solana", "security", "audit", "architecture"],
    },
    {
        slug: "surfpool-skill",
        name: "Surfpool Dev Environment",
        category: "infrastructure",
        description: "Solana development environment with mainnet forking, cheatcodes, and Infrastructure as Code.",
        source_url: "https://github.com/sendaifun/skills/tree/main/skills/surfpool",
        framework: "sendaifun/skills",
        tags: ["solana", "devtools", "testing", "forking"],
    },
    {
        slug: "solana-kit-skill",
        name: "Solana Kit (@solana/kit)",
        category: "infrastructure",
        description: "Modern tree-shakeable zero-dependency JavaScript SDK for Solana from Anza.",
        source_url: "https://github.com/sendaifun/skills/tree/main/skills/solana-kit",
        framework: "sendaifun/skills",
        tags: ["solana", "sdk", "javascript", "anza"],
    },
    {
        slug: "solana-kit-migration",
        name: "Solana Kit Migration",
        category: "infrastructure",
        description: "Migrate from @solana/web3.js v1.x to @solana/kit. API mappings and edge case handling.",
        source_url: "https://github.com/sendaifun/skills/tree/main/skills/solana-kit-migration",
        framework: "sendaifun/skills",
        tags: ["solana", "migration", "sdk", "web3js"],
    },
    {
        slug: "crypto-com-agent",
        name: "Crypto.com Agent Trading",
        category: "trading",
        description: "Trade 200+ tokens via Crypto.com API. Buy, sell, swap, query balances, view portfolio, and market prices.",
        source_url: "https://github.com/crypto-com/crypto-agent-trading",
        framework: "OpenClaw",
        tags: ["crypto-com", "trading", "cex", "agent"],
    },
    {
        slug: "binance-ai-skills",
        name: "Binance AI Agent Skills",
        category: "trading",
        description: "7 agent skills: spot trading, wallet analysis, token info, market rank, meme tracking, trading signals, token audit.",
        source_url: "https://github.com/nicholasgriffintn/binance-ai-agent-skills",
        framework: "Binance Skills Hub",
        tags: ["binance", "trading", "cex", "meme", "signals"],
    },
    {
        slug: "firecrawl-skill",
        name: "Firecrawl Web Scraping",
        category: "data",
        description: "Web scraping for AI agents. Converts pages to LLM-ready markdown with anti-bot bypass and JS rendering.",
        source_url: "https://github.com/mendableai/firecrawl",
        framework: "Custom",
        tags: ["scraping", "web", "markdown", "data"],
    },
    {
        slug: "apify-agent-skills",
        name: "Apify Agent Skills",
        category: "data",
        description: "15,000+ web scraping and automation Actors for AI agents. Universal scraper, market research, lead generation.",
        source_url: "https://github.com/apify/agent-skills",
        framework: "Custom",
        tags: ["scraping", "automation", "apify", "data"],
    },
    {
        slug: "notte-browser",
        name: "Notte Browser Agent",
        category: "automation",
        description: "Open-source browser automation for AI agents. Headless browser with anti-detection, proxy support, and MCP integration.",
        source_url: "https://github.com/nottelabs/notte",
        framework: "Custom",
        tags: ["browser", "automation", "scraping", "mcp"],
    },

    // ────────────── 500-ENTRY CSV BATCH (Crypto/Blockchain MCPs) ──────────────
    {
        slug: "bicscan-mcp",
        name: "BICScan Risk Scanner",
        category: "research",
        description: "Blockchain address risk scoring MCP. Risk scores 0-100 for addresses, domains, and dApps. Multi-chain support.",
        source_url: "https://github.com/ahnlabio/bicscan-mcp",
        framework: "MCP",
        tags: ["security", "risk", "blockchain", "scanning", "mcp"],
        body: `# BICScan Risk Scanner MCP

Blockchain address risk scoring via MCP. Returns risk scores 0–100 for wallet addresses, domains, and dApps across multiple chains.

## Agent Usage

### Install
\`\`\`json
{
  "mcpServers": {
    "bicscan": {
      "command": "npx",
      "args": ["-y", "bicscan-mcp"],
      "env": { "BICSCAN_API_KEY": "<your-key>" }
    }
  }
}
\`\`\`

### Key Tools
- \`check_address_risk\` — get a 0–100 risk score for a wallet address (0 = safe, 100 = high risk)
- \`check_domain_risk\` — scan a domain/dApp URL for phishing or scam indicators
- \`get_risk_details\` — detailed breakdown of risk factors (sanctions, mixer usage, exploit history)

### Example Prompt
> "Check the risk score for address 0xabc...123 before I send funds."

### When to Use
- Before interacting with an unknown wallet or contract
- Screening dApp URLs for phishing
- Pre-trade checks in automated trading workflows

---
*Source: [ahnlabio/bicscan-mcp](https://github.com/ahnlabio/bicscan-mcp)*`,
    },
    {
        slug: "armor-crypto-mcp",
        name: "Armor Crypto MCP",
        category: "trading",
        description: "Multi-chain crypto MCP for AI agents. Wallet management, swaps, DCA, limit orders, staking. Currently supports Solana.",
        source_url: "https://github.com/armorwallet/armor-crypto-mcp",
        framework: "MCP",
        tags: ["solana", "wallet", "swaps", "dca", "staking", "mcp"],
        body: `# Armor Crypto MCP

Multi-chain crypto MCP for AI agents. Wallet management, token swaps, DCA strategies, limit orders, and staking — currently on Solana.

## Agent Usage

### Install
\`\`\`json
{
  "mcpServers": {
    "armor": {
      "command": "npx",
      "args": ["-y", "armor-crypto-mcp"],
      "env": { "ARMOR_API_KEY": "<your-key>" }
    }
  }
}
\`\`\`

### Key Tools
- \`create_wallet\` — create a new Solana wallet
- \`get_balance\` — check SOL and token balances
- \`swap_tokens\` — swap between tokens (e.g. SOL → USDC)
- \`create_dca_order\` — set up dollar-cost averaging (token, amount, interval)
- \`place_limit_order\` — place a limit buy/sell order
- \`stake_sol\` — stake SOL to a validator
- \`get_transaction_history\` — list recent transactions

### Example Prompt
> "Set up a DCA to buy \$50 of SOL every day for the next 30 days."

---
*Source: [armorwallet/armor-crypto-mcp](https://github.com/armorwallet/armor-crypto-mcp)*`,
    },
    {
        slug: "bankless-onchain-mcp",
        name: "Bankless Onchain MCP",
        category: "data",
        description: "Query on-chain data via MCP. Contract operations, event monitoring, and transaction analysis across blockchains.",
        source_url: "https://github.com/bankless/onchain-mcp",
        framework: "MCP",
        tags: ["onchain", "data", "contracts", "events", "transactions", "mcp"],
        body: `# Bankless Onchain MCP

Query on-chain data across blockchains via MCP. Read contracts, monitor events, and analyze transactions.

## Agent Usage

### Install
\`\`\`json
{
  "mcpServers": {
    "bankless-onchain": {
      "command": "npx",
      "args": ["-y", "@bankless/onchain-mcp"],
      "env": { "RPC_URL": "<your-rpc-url>" }
    }
  }
}
\`\`\`

### Key Tools
- \`read_contract\` — call a read-only contract function (address, ABI, method, args)
- \`get_events\` — fetch contract events by topic/block range
- \`get_transaction\` — get full transaction details by hash
- \`get_balance\` — check native/token balance for an address
- \`get_block\` — fetch block data by number or hash

### Example Prompt
> "Read the totalSupply of the USDC contract on Ethereum mainnet."

---
*Source: [bankless/onchain-mcp](https://github.com/bankless/onchain-mcp)*`,
    },
    {
        slug: "bitnovo-pay-mcp",
        name: "Bitnovo Pay MCP",
        category: "infrastructure",
        description: "Cryptocurrency payment processing MCP. Create payments, manage webhooks, cloud deployment support.",
        source_url: "https://github.com/bitnovo/mcp-bitnovo-pay",
        framework: "MCP",
        tags: ["payments", "crypto", "invoicing", "mcp"],
        body: `# Bitnovo Pay MCP

Cryptocurrency payment processing via MCP. Create payment requests, manage webhooks, and track payment status.

## Agent Usage

### Install
\`\`\`json
{
  "mcpServers": {
    "bitnovo-pay": {
      "command": "npx",
      "args": ["-y", "mcp-bitnovo-pay"],
      "env": { "BITNOVO_API_KEY": "<your-key>" }
    }
  }
}
\`\`\`

### Key Tools
- \`create_payment\` — create a crypto payment request (amount, currency, description)
- \`get_payment_status\` — check if a payment has been completed
- \`list_payments\` — list all payments with filters (status, date range)
- \`create_webhook\` — register a webhook URL for payment events
- \`get_supported_currencies\` — list supported cryptocurrencies

### Example Prompt
> "Create a payment request for 50 USDT and give me the payment link."

---
*Source: [bitnovo/mcp-bitnovo-pay](https://github.com/bitnovo/mcp-bitnovo-pay)*`,
    },
    {
        slug: "chainaware-prediction-mcp",
        name: "ChainAware Prediction MCP",
        category: "research",
        description: "Wallet behavior prediction and fraud detection MCP. Rug-pull detection, token ranking, behavioral analysis.",
        source_url: "https://github.com/ChainAware/behavioral-prediction-mcp",
        framework: "MCP",
        tags: ["fraud", "prediction", "rug-pull", "security", "mcp"],
        body: `# ChainAware Prediction MCP

Wallet behavior prediction and fraud detection via MCP. Detect rug-pulls, rank tokens by safety, and analyze wallet behavioral patterns.

## Agent Usage

### Install
\`\`\`json
{
  "mcpServers": {
    "chainaware": {
      "command": "npx",
      "args": ["-y", "@chainaware/behavioral-prediction-mcp"],
      "env": { "CHAINAWARE_API_KEY": "<your-key>" }
    }
  }
}
\`\`\`

### Key Tools
- \`detect_rug_pull\` — analyze a token contract for rug-pull risk indicators
- \`rank_tokens\` — rank tokens by safety score and behavioral signals
- \`analyze_wallet\` — behavioral analysis of a wallet (patterns, risk flags, associations)
- \`predict_behavior\` — predict likely next actions for a wallet based on history
- \`get_fraud_score\` — overall fraud risk score for an address

### Example Prompt
> "Analyze this token contract for rug-pull risk before I ape in: 0xabc...123"

### When to Use
- Pre-trade token safety checks
- Wallet due diligence before interacting with a counterparty
- Automated fraud screening in trading pipelines

---
*Source: [ChainAware/behavioral-prediction-mcp](https://github.com/ChainAware/behavioral-prediction-mcp)*`,
    },
    {
        slug: "coingecko-mcp",
        name: "CoinGecko MCP",
        category: "data",
        description: "Official CoinGecko MCP server. Crypto price data, market data, TypeScript SDK with sandboxed code execution.",
        source_url: "https://github.com/coingecko/coingecko-typescript",
        framework: "MCP",
        tags: ["coingecko", "prices", "market-data", "mcp"],
        body: `# CoinGecko MCP

Official CoinGecko MCP server. Access real-time and historical crypto price data, market caps, volumes, and trending coins.

## Agent Usage

### Install
\`\`\`json
{
  "mcpServers": {
    "coingecko": {
      "command": "npx",
      "args": ["-y", "@coingecko/mcp-server"],
      "env": { "COINGECKO_API_KEY": "<your-key>" }
    }
  }
}
\`\`\`

### Key Tools
- \`get_price\` — current price for one or more coins (supports multiple vs currencies)
- \`get_coin_data\` — detailed coin info: description, market cap, ATH, links
- \`get_market_chart\` — historical price/volume data (1d, 7d, 30d, 1y, max)
- \`get_trending\` — top trending coins on CoinGecko right now
- \`search_coins\` — search coins by name or symbol
- \`get_global_data\` — total market cap, BTC dominance, active coins count

### Example Prompt
> "What's the current price of ETH in USD and show me the 7-day chart?"

---
*Source: [coingecko/coingecko-typescript](https://github.com/coingecko/coingecko-typescript)*`,
    },
    {
        slug: "coinex-mcp",
        name: "CoinEx MCP",
        category: "trading",
        description: "CoinEx exchange MCP for AI agents. Market data, spot/futures trading, account management. 14 sections.",
        source_url: "https://github.com/coinexcom/coinex_mcp_server",
        framework: "MCP",
        tags: ["coinex", "exchange", "trading", "futures", "mcp"],
        body: `# CoinEx MCP

CoinEx exchange MCP server for AI agents. 14 tool sections covering market data, spot trading, futures, and account management.

## Agent Usage

### Install
\`\`\`json
{
  "mcpServers": {
    "coinex": {
      "command": "npx",
      "args": ["-y", "coinex-mcp-server"],
      "env": { "COINEX_ACCESS_ID": "<your-id>", "COINEX_SECRET_KEY": "<your-secret>" }
    }
  }
}
\`\`\`

### Key Tools
- \`get_market_ticker\` — real-time price, volume, and 24h change for a pair
- \`get_order_book\` — current order book depth for a trading pair
- \`place_spot_order\` — place a spot market or limit order
- \`place_futures_order\` — open/close futures positions
- \`get_account_balance\` — check balances across spot and futures
- \`cancel_order\` — cancel an open order
- \`get_trade_history\` — recent trades for a pair

### Example Prompt
> "Place a limit buy for 100 USDT worth of BTC at 60000 on CoinEx."

---
*Source: [coinexcom/coinex_mcp_server](https://github.com/coinexcom/coinex_mcp_server)*`,
    },
    {
        slug: "coinstats-mcp",
        name: "CoinStats MCP",
        category: "data",
        description: "CoinStats MCP server for crypto market data, portfolio tracking, and news. NPX or Docker setup.",
        source_url: "https://github.com/CoinStatsHQ/coinstats-mcp",
        framework: "MCP",
        tags: ["portfolio", "market-data", "tracking", "mcp"],
        body: `# CoinStats MCP

CoinStats MCP server for crypto market data, portfolio tracking, and news aggregation.

## Agent Usage

### Install
\`\`\`json
{
  "mcpServers": {
    "coinstats": {
      "command": "npx",
      "args": ["-y", "@coinstats/mcp-server"],
      "env": { "COINSTATS_API_KEY": "<your-key>" }
    }
  }
}
\`\`\`

### Key Tools
- \`get_coin_price\` — current price and market data for a coin
- \`get_portfolio\` — view portfolio holdings with P&L
- \`get_market_overview\` — top gainers, losers, and market summary
- \`get_news\` — latest crypto news filtered by coin or topic
- \`search_coins\` — find coins by name or symbol
- \`get_coin_chart\` — price chart data for a coin over a time range

### Example Prompt
> "Show me my portfolio performance and today's top gainers."

---
*Source: [CoinStatsHQ/coinstats-mcp](https://github.com/CoinStatsHQ/coinstats-mcp)*`,
    },

    // ────────────── UI & FRONTEND DESIGN ──────────────
    {
        slug: "ui-baseline-ui",
        name: "Baseline UI",
        category: "design",
        description:
            "Validates animation durations, enforces typography scale, and checks component accessibility for consistent UI quality.",
        source_url: "https://github.com/ibelick/ui-skills/tree/main/skills/baseline-ui",
        skill_url: "https://github.com/ibelick/ui-skills/blob/main/skills/baseline-ui/SKILL.md",
        framework: "UI Skills",
        tags: ["ui", "accessibility", "typography", "animation", "validation"],
    },
    {
        slug: "ui-fixing-accessibility",
        name: "Fixing Accessibility",
        category: "design",
        description:
            "Audit and fix HTML accessibility issues including ARIA labels, keyboard navigation, and focus management.",
        source_url: "https://github.com/ibelick/ui-skills/tree/main/skills/fixing-accessibility",
        skill_url: "https://github.com/ibelick/ui-skills/blob/main/skills/fixing-accessibility/SKILL.md",
        framework: "UI Skills",
        tags: ["accessibility", "aria", "a11y", "audit"],
    },
    {
        slug: "ui-fixing-metadata",
        name: "Fixing Metadata",
        category: "design",
        description:
            "Audit and fix HTML metadata including page titles, meta descriptions, canonical URLs, and Open Graph tags.",
        source_url: "https://github.com/ibelick/ui-skills/tree/main/skills/fixing-metadata",
        skill_url: "https://github.com/ibelick/ui-skills/blob/main/skills/fixing-metadata/SKILL.md",
        framework: "UI Skills",
        tags: ["seo", "metadata", "opengraph", "audit"],
    },
    {
        slug: "ui-fixing-motion-performance",
        name: "Fixing Motion Performance",
        category: "design",
        description:
            "Audit and fix animation performance issues including layout thrashing and compositor properties.",
        source_url: "https://github.com/ibelick/ui-skills/tree/main/skills/fixing-motion-performance",
        skill_url: "https://github.com/ibelick/ui-skills/blob/main/skills/fixing-motion-performance/SKILL.md",
        framework: "UI Skills",
        tags: ["animation", "performance", "motion", "optimization"],
    },
    {
        slug: "ui-12-principles-of-animation",
        name: "12 Principles of Animation",
        category: "design",
        description:
            "Apply Disney's 12 animation principles to web interfaces to make motion feel natural and organic.",
        source_url: "https://github.com/raphaelsalaja/userinterface-wiki/tree/main/skills/12-principles-of-animation",
        skill_url: "https://github.com/raphaelsalaja/userinterface-wiki/blob/main/skills/12-principles-of-animation/SKILL.md",
        framework: "UI Skills",
        tags: ["animation", "motion", "principles", "disney"],
    },
    {
        slug: "ui-canvas-design",
        name: "Canvas Design",
        category: "design",
        description:
            "Create original visual designs and art on digital canvases using design philosophy and creative direction.",
        source_url: "https://github.com/anthropics/skills/tree/main/skills/canvas-design",
        skill_url: "https://github.com/anthropics/skills/blob/main/skills/canvas-design/SKILL.md",
        framework: "Anthropic",
        tags: ["canvas", "visual-design", "creative", "art"],
    },
    {
        slug: "ui-design-lab",
        name: "Design Lab",
        category: "design",
        description:
            "Interactive design exploration workflow: conduct interviews, generate variants, and refine UI designs iteratively.",
        source_url: "https://github.com/0xdesign/design-plugin/tree/main/design-and-refine/skills/design-lab",
        skill_url: "https://github.com/0xdesign/design-plugin/blob/main/design-and-refine/skills/design-lab/SKILL.md",
        framework: "UI Skills",
        tags: ["design", "exploration", "iteration", "workflow"],
    },
    {
        slug: "ui-frontend-design",
        name: "Frontend Design",
        category: "design",
        description:
            "Create distinctive, production-grade frontend interfaces with high design quality and craft.",
        source_url: "https://github.com/anthropics/skills/tree/main/skills/frontend-design",
        skill_url: "https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md",
        framework: "Anthropic",
        tags: ["frontend", "design", "production", "craft"],
    },
    {
        slug: "ui-interaction-design",
        name: "Interaction Design",
        category: "design",
        description:
            "Design and implement microinteractions, motion design, transitions, and user feedback patterns.",
        source_url: "https://github.com/wshobson/agents/tree/main/plugins/ui-design/skills/interaction-design",
        skill_url: "https://github.com/wshobson/agents/blob/main/plugins/ui-design/skills/interaction-design/SKILL.md",
        framework: "UI Skills",
        tags: ["microinteractions", "motion", "transitions", "feedback"],
    },
    {
        slug: "ui-interface-design",
        name: "Interface Design",
        category: "design",
        description:
            "Specialized skill for dashboards, admin panels, and SaaS apps focused on craft and consistency.",
        source_url: "https://github.com/Dammyjay93/interface-design/tree/main/.claude/skills/interface-design",
        skill_url: "https://github.com/Dammyjay93/interface-design/blob/main/.claude/skills/interface-design/SKILL.md",
        framework: "UI Skills",
        tags: ["dashboard", "admin", "saas", "consistency"],
    },
    {
        slug: "ui-swiftui-patterns",
        name: "SwiftUI UI Patterns",
        category: "design",
        description:
            "Best practices and example-driven guidance for building SwiftUI views and components on iOS.",
        source_url: "https://github.com/dimillian/skills/tree/main/swiftui-ui-patterns",
        skill_url: "https://github.com/dimillian/skills/blob/main/swiftui-ui-patterns/SKILL.md",
        framework: "UI Skills",
        tags: ["swiftui", "ios", "mobile", "patterns"],
    },
    {
        slug: "ui-tailwind-css-patterns",
        name: "Tailwind CSS Patterns",
        category: "design",
        description:
            "Expert guide for building modern, responsive interfaces with Tailwind CSS utility-first patterns.",
        source_url: "https://github.com/giuseppe-trisciuoglio/developer-kit/tree/main/skills/tailwind-css",
        skill_url: "https://github.com/giuseppe-trisciuoglio/developer-kit/blob/main/skills/tailwind-css/SKILL.md",
        framework: "UI Skills",
        tags: ["tailwind", "css", "responsive", "utility-first"],
    },
    {
        slug: "ui-ux-pro-max",
        name: "UI/UX Pro Max",
        category: "design",
        description:
            "Comprehensive UI/UX design intelligence with 50+ styles, 97 palettes, and 9 technology stacks.",
        source_url: "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/tree/main/.claude/skills/ui-ux-pro-max",
        skill_url: "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/ui-ux-pro-max/SKILL.md",
        framework: "UI Skills",
        tags: ["ui-ux", "comprehensive", "palettes", "styles"],
    },
    {
        slug: "ui-wcag-audit",
        name: "WCAG Audit Patterns",
        category: "design",
        description:
            "Conduct WCAG 2.2 accessibility audits with automated testing, manual verification, and remediation.",
        source_url: "https://github.com/wshobson/agents/tree/main/plugins/accessibility-compliance/skills/wcag-audit-patterns",
        skill_url: "https://github.com/wshobson/agents/blob/main/plugins/accessibility-compliance/skills/wcag-audit-patterns/SKILL.md",
        framework: "UI Skills",
        tags: ["wcag", "accessibility", "audit", "compliance"],
    },
    {
        slug: "ui-web-design-guidelines",
        name: "Web Design Guidelines",
        category: "design",
        description:
            "Review UI code for Web Interface Guidelines compliance and audit against best practices.",
        source_url: "https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines",
        skill_url: "https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md",
        framework: "Vercel",
        tags: ["web-design", "guidelines", "best-practices", "audit"],
    },

    // ────────────── EXPERIMENTAL ──────────────
    {
        slug: "skill-token",
        name: "$SKILL Token Experiment",
        category: "experimental",
        description:
            "The experiment you're part of right now. A skill.md file that spreads through AI agent networks and drives on-chain activity — with human approval at every step.",
        source_url: "https://readtheskill.com",
        skill_url: "https://readtheskill.com/skill.md",
        framework: "readtheskill",
        tags: ["memecoin", "experiment", "propagation", "solana"],
    },
    ...(BATCH_SKILLS as unknown as Skill[]),
    ...(COMMUNICATION_SKILLS as unknown as Skill[]),
    ...(DESIGN_EXTENDED_SKILLS as unknown as Skill[]),
    ...(MARKETING_SKILLS as unknown as Skill[]),
    ...(OFFICE_SKILLS as unknown as Skill[]),
    ...(PRODUCTIVITY_EXTENDED_SKILLS as unknown as Skill[]),
    ...(SOLANA_TOOLKIT_SKILLS as unknown as Skill[]),
    ...(AWESOME_SOLANA_AI_SKILLS as unknown as Skill[]),
    ...(FINTOOL_SKILLS as unknown as Skill[]),
    ...(ENDPOINT_SKILLS as unknown as Skill[]),
    ...(CLAWHUB_SKILLS as unknown as Skill[]),
];

const AWESOME_SOLANA_OVERRIDES: Record<string, Partial<Skill>> = {
    "clawpump-skill": {
        skill_url: "https://www.clawpump.tech/skill.md",
        subcategory: "token-launch",
    },
    "clawpump-arbitrage": {
        skill_url: "https://clawpump.tech/arbitrage.md",
        subcategory: "arbitrage",
    },
    "dflow-phantom-connect": {
        source_url: "https://github.com/DFlowProtocol/dflow_phantom-connect-skill",
        skill_url: "https://raw.githubusercontent.com/DFlowProtocol/dflow_phantom-connect-skill/main/skill/SKILL.md",
        subcategory: "wallet-connected-trading",
    },
    "dflow-swap": {
        source_url: "https://github.com/sendaifun/skills/tree/main/skills/dflow",
        skill_url: "https://raw.githubusercontent.com/sendaifun/skills/main/skills/dflow/SKILL.md",
        subcategory: "dex-swaps",
    },
    "drift-protocol": {
        source_url: "https://github.com/sendaifun/skills/tree/main/skills/drift",
        skill_url: "https://raw.githubusercontent.com/sendaifun/skills/main/skills/drift/SKILL.md",
        subcategory: "perps-trading",
    },
    "jupiter-api-integration": {
        skill_url: "https://raw.githubusercontent.com/jup-ag/agent-skills/main/skills/integrating-jupiter/SKILL.md",
        category: "defi",
        subcategory: "dex-aggregation",
    },
    "jupiter-lend": {
        skill_url: "https://raw.githubusercontent.com/jup-ag/agent-skills/main/skills/jupiter-lend/SKILL.md",
        subcategory: "lending-yield",
    },
    "kamino-finance": {
        source_url: "https://github.com/sendaifun/skills/tree/main/skills/kamino",
        skill_url: "https://raw.githubusercontent.com/sendaifun/skills/main/skills/kamino/SKILL.md",
        subcategory: "lending-yield",
    },
    "lulo-aggregator": {
        source_url: "https://github.com/sendaifun/skills/tree/main/skills/lulo",
        skill_url: "https://raw.githubusercontent.com/sendaifun/skills/main/skills/lulo/SKILL.md",
        subcategory: "lending-aggregation",
    },
    "meteora-swap": {
        source_url: "https://github.com/sendaifun/skills/tree/main/skills/meteora",
        skill_url: "https://raw.githubusercontent.com/sendaifun/skills/main/skills/meteora/SKILL.md",
        category: "defi",
        subcategory: "amm-liquidity",
    },
    "orca-whirlpools": {
        source_url: "https://github.com/sendaifun/skills/tree/main/skills/orca",
        skill_url: "https://raw.githubusercontent.com/sendaifun/skills/main/skills/orca/SKILL.md",
        category: "defi",
        subcategory: "concentrated-liquidity",
    },
    "pumpfun-launch": {
        source_url: "https://github.com/sendaifun/skills/tree/main/skills/pumpfun",
        skill_url: "https://raw.githubusercontent.com/sendaifun/skills/main/skills/pumpfun/SKILL.md",
        subcategory: "token-launch",
    },
    "ranger-finance": {
        source_url: "https://github.com/sendaifun/skills/tree/main/skills/ranger-finance",
        skill_url: "https://raw.githubusercontent.com/sendaifun/skills/main/skills/ranger-finance/SKILL.md",
        subcategory: "perps-aggregation",
    },
    "raydium-swap": {
        source_url: "https://github.com/sendaifun/skills/tree/main/skills/raydium",
        skill_url: "https://raw.githubusercontent.com/sendaifun/skills/main/skills/raydium/SKILL.md",
        category: "defi",
        subcategory: "dex-swaps",
    },
    "raydium-liquidity": {
        source_url: "https://github.com/sendaifun/skills/tree/main/skills/raydium",
        skill_url: "https://raw.githubusercontent.com/sendaifun/skills/main/skills/raydium/SKILL.md",
        category: "defi",
        subcategory: "liquidity-management",
    },
    "sanctum-lst": {
        source_url: "https://github.com/sendaifun/skills/tree/main/skills/sanctum",
        skill_url: "https://raw.githubusercontent.com/sendaifun/skills/main/skills/sanctum/SKILL.md",
        subcategory: "staking-lst",
    },
    "debridge-dln": {
        source_url: "https://github.com/sendaifun/skills/tree/main/skills/debridge",
        skill_url: "https://raw.githubusercontent.com/sendaifun/skills/main/skills/debridge/SKILL.md",
        subcategory: "cross-chain-bridging",
    },
    "light-protocol-zk": {
        source_url: "https://github.com/sendaifun/skills/tree/main/skills/light-protocol",
        skill_url: "https://raw.githubusercontent.com/sendaifun/skills/main/skills/light-protocol/SKILL.md",
        subcategory: "zk-compression",
    },
    "metaplex-nft": {
        source_url: "https://github.com/sendaifun/skills/tree/main/skills/metaplex",
        skill_url: "https://raw.githubusercontent.com/sendaifun/skills/main/skills/metaplex/SKILL.md",
        subcategory: "nft-development",
    },
    "pyth-network": {
        source_url: "https://github.com/sendaifun/skills/tree/main/skills/pyth",
        skill_url: "https://raw.githubusercontent.com/sendaifun/skills/main/skills/pyth/SKILL.md",
        subcategory: "oracle-pricing",
    },
    "solana-dev-skill": {
        category: "coding",
        subcategory: "solana-development",
        source_url: "https://github.com/solana-foundation/solana-dev-skill",
        skill_url: "https://raw.githubusercontent.com/solana-foundation/solana-dev-skill/main/skill/SKILL.md",
    },
    "squads-multisig": {
        source_url: "https://github.com/sendaifun/skills/tree/main/skills/squads",
        skill_url: "https://raw.githubusercontent.com/sendaifun/skills/main/skills/squads/SKILL.md",
        category: "infrastructure",
        subcategory: "account-abstraction",
    },
    "switchboard-oracle": {
        source_url: "https://github.com/sendaifun/skills/tree/main/skills/switchboard",
        skill_url: "https://raw.githubusercontent.com/sendaifun/skills/main/skills/switchboard/SKILL.md",
        subcategory: "oracle-pricing",
    },
};

for (const skill of SKILLS) {
    const override = AWESOME_SOLANA_OVERRIDES[skill.slug];
    if (override) Object.assign(skill, override);
}

export function getSkillsByCategory(category: Category): Skill[] {
    return SKILLS.filter((s) => s.category === category);
}

export function getSkillBySlug(
    category: string,
    slug: string
): Skill | undefined {
    return SKILLS.find((s) => s.category === category && s.slug === slug);
}

export function getCategoryCount(category: Category): number {
    return SKILLS.filter((s) => s.category === category).length;
}

export function inferSourceFromUrl(url: string): Skill["source"] {
    const lower = url.toLowerCase();
    if (lower.includes("clawhub")) return "clawhub";
    if (lower.includes("lobehub")) return "lobehub";
    if (lower.includes("smithery")) return "smithery";
    if (lower.includes("github.com")) return "github";
    return "official";
}

export function inferSubcategory(skill: Skill): string {
    const tags = skill.tags.map((tag) => tag.toLowerCase());
    const has = (...needles: string[]) => needles.some((n) => tags.some((t) => t.includes(n)));

    if (skill.subcategory) return skill.subcategory;

    switch (skill.category) {
        case "automation":
            if (has("workflow", "orchestration", "zapier", "n8n", "make")) return "workflows";
            if (has("calendar", "scheduling", "cron", "reminder")) return "scheduling";
            if (has("email", "smtp", "gmail", "outlook")) return "email";
            if (has("browser", "puppeteer", "playwright", "selenium", "scraping")) return "browser-automation";
            if (has("webhook", "api", "integrations")) return "api-integrations";
            if (has("cicd", "devops", "deploy")) return "devops";
            return "automation";
        case "design":
            if (has("image-gen", "stable-diffusion", "creative")) return "image-generation";
            if (has("image-editing", "background-removal", "optimization")) return "image-editing";
            if (has("ui-ux", "components", "wireframes", "prototyping")) return "ui-ux";
            if (has("icons", "svg", "illustrations", "graphics")) return "graphics";
            if (has("video", "animation")) return "video";
            if (has("3d", "rendering")) return "3d";
            return "design";
        case "productivity":
            if (has("notes", "knowledge", "markdown")) return "notes";
            if (has("docs", "writing", "wiki")) return "docs";
            if (has("spreadsheets", "excel", "reports", "database")) return "spreadsheets";
            if (has("email", "inbox")) return "email";
            if (has("calendar", "scheduling", "events", "meetings")) return "calendar";
            if (has("tasks", "todo", "issues", "tickets")) return "task-management";
            if (has("project-management", "kanban", "sprints", "boards")) return "project-management";
            if (has("time-tracking", "timesheets")) return "time-tracking";
            if (has("reading", "research", "bookmarks", "curation")) return "research";
            if (has("communication", "collaboration", "team", "notifications")) return "communication";
            return "productivity";
        case "coding":
            if (has("ide", "editor", "extensions")) return "ides-editors";
            if (has("git", "github", "gitlab", "bitbucket", "vcs", "code-review")) return "git-vcs";
            if (has("language", "python", "rust", "go", "typescript", "ruby", "java", "swift", "kotlin")) return "languages";
            if (has("npm", "pip", "cargo", "brew", "pnpm", "yarn", "package")) return "package-managers";
            if (has("test", "jest", "pytest", "vitest", "playwright", "cypress", "e2e")) return "testing";
            if (has("debug", "profil", "logging", "sentry", "trace")) return "debugging";
            if (has("deploy", "vercel", "railway", "docker", "aws", "fly", "netlify", "hosting")) return "deployment";
            if (has("database", "postgres", "redis", "mongo", "supabase", "prisma", "drizzle", "sql")) return "databases";
            if (has("api", "rest", "graphql", "openapi", "trpc", "hono", "express", "endpoint")) return "apis";
            if (has("docs", "readme", "storybook", "jsdoc", "documentation")) return "documentation";
            if (has("cicd", "pipeline", "lint", "format", "actions")) return "cicd";
            return "coding";
        case "communication":
            if (has("chat", "slack", "discord", "teams", "telegram", "mattermost")) return "team-chat";
            if (has("email", "mailchimp", "newsletter", "outreach", "convertkit", "brevo")) return "email-outreach";
            if (has("social", "twitter", "linkedin", "instagram", "buffer", "hootsuite", "tiktok")) return "social-media";
            if (has("meeting", "zoom", "loom", "otter", "transcri", "webinar")) return "meetings";
            if (has("sms", "twilio", "vonage", "whatsapp", "messaging")) return "sms-messaging";
            if (has("crm", "hubspot", "salesforce", "attio", "folk")) return "crm";
            if (has("community", "discourse", "circle", "forum")) return "community";
            return "communication";
        case "marketing":
            if (has("cro", "conversion", "landing-page", "signup", "paywall", "popup")) return "conversion-optimization";
            if (has("copywriting", "copy-editing", "email", "content")) return "content-copy";
            if (has("seo", "schema", "site-architecture", "programmatic-seo")) return "seo-discovery";
            if (has("analytics", "tracking", "measurement", "ab-test", "experiments")) return "measurement-testing";
            if (has("paid-ads", "ads", "social", "distribution", "acquisition")) return "paid-distribution";
            if (has("retention", "churn", "lifecycle")) return "retention";
            if (has("growth", "referral", "virality", "free-tools")) return "growth-engineering";
            if (has("revops", "sales", "enablement", "pipeline")) return "sales-revops";
            if (has("pricing", "positioning", "gtm", "launch", "strategy")) return "strategy-monetization";
            return "marketing";
        case "endpoints":
            if (has("crawl", "crawler", "site-map", "sitemap")) return "web-crawling";
            if (has("scrape", "html", "content", "markdown", "snapshot")) return "web-extraction";
            if (has("api", "endpoint", "rest", "json", "http")) return "api-calls";
            if (has("mcp", "tool-call", "tools")) return "tool-calls";
            return "endpoints";
        default:
            return skill.category;
    }
}
