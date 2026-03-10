export const SOLANA_TOOLKIT_SKILLS = [
  {
    slug: "solana-agent-kit-core",
    name: "Solana Agent Kit Core Runtime",
    category: "infrastructure",
    subcategory: "sdk-runtime",
    description:
      "Core runtime for connecting AI agents to Solana protocols with a plugin-based action system.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["solana", "agent-runtime", "plugins", "toolkit"],
    body: `# Solana Agent Kit Core Runtime

Initialize the Solana Agent Kit runtime once, then attach plugins for protocol-specific actions.

## Setup
\`\`\`bash
npm install solana-agent-kit
\`\`\`

Required env:
- \`SOLANA_PRIVATE_KEY\`
- \`RPC_URL\`

## Real Agent Usage
> "Set up my Solana agent runtime and list available toolkit actions."

## Connected Skills
- \`solana-agent-kit-wallets\`
- \`solana-agent-kit-plugin-token\`
- \`solana-agent-kit-plugin-defi\`
- \`solana-agent-kit-plugin-nft\``,
  },
  {
    slug: "solana-agent-kit-wallets",
    name: "Solana Agent Kit Wallet Setup",
    category: "infrastructure",
    subcategory: "wallet-runtime",
    description:
      "Wallet bootstrapping for Solana Agent Kit using keypair or wallet adapter interfaces.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["solana", "wallet", "keypair", "setup"],
    body: `# Solana Agent Kit Wallet Setup

Configure wallet signing for autonomous or human-approved transactions.

## Setup
- Use a dedicated wallet for agent operations.
- Set spend limits and monitoring around hot wallets.

## Real Agent Usage
> "Load this wallet and confirm my SOL + USDC balances before any trade."`,
  },
  {
    slug: "solana-agent-kit-plugin-token",
    name: "Solana Agent Kit Token Plugin",
    category: "defi",
    subcategory: "token-ops",
    description:
      "Token operations plugin for transfer, swap, bridge support, and token utility workflows.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["solana", "token", "transfers", "swap"],
    body: `# Token Plugin

Enables token-level operations used by trade and treasury agents.

## Setup
\`\`\`bash
npm install @solana-agent-kit/plugin-token
\`\`\`

## Real Agent Usage
> "Swap 2 SOL to USDC with max 1% slippage and return tx signature."`,
  },
  {
    slug: "solana-agent-kit-plugin-nft",
    name: "Solana Agent Kit NFT Plugin",
    category: "nfts",
    subcategory: "nft-ops",
    description:
      "NFT operations plugin for collection creation, minting, listing, and metadata handling.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["solana", "nft", "metaplex", "mint"],
    body: `# NFT Plugin

Supports NFT collection and mint workflows for creator and marketplace agents.

## Setup
\`\`\`bash
npm install @solana-agent-kit/plugin-nft
\`\`\`

## Real Agent Usage
> "Create a collection and mint 10 NFTs with this metadata URI."`,
  },
  {
    slug: "solana-agent-kit-plugin-defi",
    name: "Solana Agent Kit DeFi Plugin",
    category: "defi",
    subcategory: "defi-runtime",
    description:
      "Main DeFi plugin for swaps, lending, perps, vaults, staking, and protocol interactions.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["solana", "defi", "staking", "perps", "lending"],
    body: `# DeFi Plugin

Core DeFi execution layer used by trading and treasury automation.

## Setup
\`\`\`bash
npm install @solana-agent-kit/plugin-defi
\`\`\`

## Real Agent Usage
> "Open a 3x SOL long on Drift with 200 USDC collateral and set risk limits."`,
  },
  {
    slug: "solana-agent-kit-plugin-misc",
    name: "Solana Agent Kit Misc Plugin",
    category: "data",
    subcategory: "utility-data",
    description:
      "Miscellaneous utility plugin covering price feeds, token info, domains, and helper actions.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["solana", "pyth", "coingecko", "utility"],
    body: `# Misc Plugin

Provides support actions used before/after execution (pricing, lookup, utility ops).

## Setup
\`\`\`bash
npm install @solana-agent-kit/plugin-misc
\`\`\`

## Real Agent Usage
> "Fetch Pyth SOL price and compare with Coingecko before trading."`,
  },
  {
    slug: "solana-agent-kit-plugin-blinks",
    name: "Solana Agent Kit Blinks Plugin",
    category: "infrastructure",
    subcategory: "blinks-runtime",
    description:
      "Blinks plugin for shareable Solana action flows and interactive transaction links.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["solana", "blinks", "actions", "distribution"],
    body: `# Blinks Plugin

Supports shareable action links for agent-driven Solana workflows.

## Setup
\`\`\`bash
npm install @solana-agent-kit/plugin-blinks
\`\`\`

## Real Agent Usage
> "Generate a blink for this staking action so users can execute it quickly."`,
  },
  {
    slug: "sak-jupiter-swap",
    name: "SAK Jupiter Swap",
    category: "defi",
    subcategory: "dex-swaps",
    description:
      "Execute Solana token swaps through Jupiter with route optimization and slippage controls.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["jupiter", "swap", "solana", "dex"],
    body: `# SAK Jupiter Swap

## Real Agent Usage
> "Swap 1.5 SOL to USDC, max slippage 0.8%, and show route + tx id."`,
  },
  {
    slug: "sak-pumpportal-launch",
    name: "SAK PumpPortal Launch",
    category: "nfts",
    subcategory: "token-launch",
    description:
      "Launch Pump.fun-compatible tokens through PumpPortal flows from agent instructions.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["pumpfun", "token-launch", "solana", "pumpportal"],
    body: `# SAK PumpPortal Launch

## Real Agent Usage
> "Launch a token with symbol AGNT, 9 decimals, and this metadata URI."`,
  },
  {
    slug: "sak-raydium-liquidity",
    name: "SAK Raydium Liquidity",
    category: "defi",
    subcategory: "liquidity-management",
    description:
      "Create and manage Raydium liquidity pools and LP position operations.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["raydium", "liquidity", "lp", "solana"],
    body: `# SAK Raydium Liquidity

## Real Agent Usage
> "Add 500 USDC + equivalent SOL liquidity to this Raydium pool."`,
  },
  {
    slug: "sak-orca-whirlpools",
    name: "SAK Orca Whirlpools",
    category: "defi",
    subcategory: "concentrated-liquidity",
    description:
      "Interact with Orca Whirlpools for concentrated liquidity and capital-efficient market making.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["orca", "whirlpool", "clmm", "solana"],
    body: `# SAK Orca Whirlpools

## Real Agent Usage
> "Open a concentrated liquidity position around current SOL/USDC price band."`,
  },
  {
    slug: "sak-meteora-dlmm",
    name: "SAK Meteora DLMM",
    category: "defi",
    subcategory: "liquidity-management",
    description:
      "Use Meteora dynamic pools and DLMM strategies for automated liquidity operations.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["meteora", "dlmm", "liquidity", "solana"],
    body: `# SAK Meteora DLMM

## Real Agent Usage
> "Create a DLMM position for SOL/USDC with conservative fee strategy."`,
  },
  {
    slug: "sak-openbook-markets",
    name: "SAK OpenBook Markets",
    category: "defi",
    subcategory: "orderbook-trading",
    description:
      "Orderbook market operations for OpenBook including listings and trading actions.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["openbook", "orderbook", "trading", "solana"],
    body: `# SAK OpenBook Markets

## Real Agent Usage
> "Place a limit buy on OpenBook at 2% below current market and cancel if not filled in 15 min."`,
  },
  {
    slug: "sak-manifest-markets",
    name: "SAK Manifest Markets",
    category: "defi",
    subcategory: "orderbook-trading",
    description:
      "Create and manage Manifest market and limit order workflows through Solana Agent Kit.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["manifest", "markets", "limit-orders", "solana"],
    body: `# SAK Manifest Markets

## Real Agent Usage
> "Create a new market and seed initial limit orders on both sides."`,
  },
  {
    slug: "sak-drift-perps-vaults",
    name: "SAK Drift Perps & Vaults",
    category: "defi",
    subcategory: "perps-vaults",
    description:
      "Drift account, perp trading, vault creation, and lending/borrowing workflows.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["drift", "perps", "vaults", "lending", "solana"],
    body: `# SAK Drift Perps & Vaults

## Real Agent Usage
> "Create my Drift user account, deposit 200 USDC, and open a small SOL long."`,
  },
  {
    slug: "sak-adrena-perps",
    name: "SAK Adrena Perps",
    category: "defi",
    subcategory: "perps-trading",
    description:
      "Execute perpetual futures strategies with Adrena protocol integrations.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["adrena", "perps", "trading", "solana"],
    body: `# SAK Adrena Perps

## Real Agent Usage
> "Open a hedged perp position on Adrena with predefined stop risk."`,
  },
  {
    slug: "sak-lulo-lending",
    name: "SAK Lulo Lending",
    category: "defi",
    subcategory: "lending-yield",
    description:
      "Lend assets through Lulo and route to best APR lending opportunities.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["lulo", "lending", "yield", "usdc"],
    body: `# SAK Lulo Lending

## Real Agent Usage
> "Lend 1,000 USDC using the best available APR and show expected daily yield."`,
  },
  {
    slug: "sak-sanctum-lst",
    name: "SAK Sanctum LST",
    category: "defi",
    subcategory: "staking-lst",
    description:
      "Manage Sanctum LST analytics, swaps, and infinite pool liquidity actions.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["sanctum", "lst", "staking", "liquidity"],
    body: `# SAK Sanctum LST

## Real Agent Usage
> "Compare APY/TVL for these LSTs and rotate to the highest-adjusted yield option."`,
  },
  {
    slug: "sak-jito-bundles",
    name: "SAK Jito Bundles",
    category: "infrastructure",
    subcategory: "execution-protection",
    description:
      "MEV-aware transaction execution and bundle workflows through Jito integration.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["jito", "bundles", "mev", "execution"],
    body: `# SAK Jito Bundles

## Real Agent Usage
> "Send this high-value swap via Jito bundle path for better execution reliability."`,
  },
  {
    slug: "sak-jupsol-solayer-staking",
    name: "SAK JupSOL & Solayer Staking",
    category: "defi",
    subcategory: "staking-lst",
    description:
      "Stake SOL via JupSOL and Solayer staking flows for liquid staking strategies.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["staking", "jupsol", "solayer", "solana"],
    body: `# SAK JupSOL & Solayer Staking

## Real Agent Usage
> "Stake 5 SOL and split across JupSOL and Solayer with 60/40 allocation."`,
  },
  {
    slug: "sak-metaplex-nft",
    name: "SAK Metaplex NFT",
    category: "nfts",
    subcategory: "nft-minting",
    description:
      "Create collections, mint NFTs, and manage metadata/royalties with Metaplex.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["metaplex", "nft", "collections", "royalties"],
    body: `# SAK Metaplex NFT

## Real Agent Usage
> "Create a collection and mint 50 NFTs with 5% royalties to this creator wallet."`,
  },
  {
    slug: "sak-3land-nft",
    name: "SAK 3Land NFT",
    category: "nfts",
    subcategory: "nft-market-launch",
    description:
      "3.land collection and item creation flows with optional listing behavior.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["3land", "nft", "listing", "solana"],
    body: `# SAK 3Land NFT

## Real Agent Usage
> "Create a 3.land collection and mint listed items priced in SOL."`,
  },
  {
    slug: "sak-token-deploy",
    name: "SAK Token Deploy (SPL + Token2022)",
    category: "nfts",
    subcategory: "token-launch",
    description:
      "Deploy SPL and Token2022 mints with supply and authority configuration options.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["spl", "token2022", "deploy", "mint"],
    body: `# SAK Token Deploy

## Real Agent Usage
> "Deploy a Token2022 mint with 1,000,000 supply and no freeze authority."`,
  },
  {
    slug: "sak-coingecko-market-data",
    name: "SAK CoinGecko Market Data",
    category: "data",
    subcategory: "market-intelligence",
    description:
      "Use CoinGecko-integrated market data for prices, trending assets, and token insights.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["coingecko", "prices", "trending", "market-data"],
    body: `# SAK CoinGecko Market Data

## Real Agent Usage
> "Show top gainers in last 24h and flag which ones are available on Solana DEXes."`,
  },
  {
    slug: "sak-pyth-price-feeds",
    name: "SAK Pyth Price Feeds",
    category: "data",
    subcategory: "oracle-pricing",
    description:
      "Fetch and use Pyth feed IDs and live price data for risk-aware execution.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["pyth", "oracle", "prices", "risk"],
    body: `# SAK Pyth Price Feeds

## Real Agent Usage
> "Get Pyth SOL/USD and abort swap if quote deviates by more than 1%."`,
  },
  {
    slug: "sak-switchboard-simulation",
    name: "SAK Switchboard Feed Simulation",
    category: "data",
    subcategory: "oracle-pricing",
    description:
      "Simulate Switchboard feeds and evaluate expected values before execution.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["switchboard", "oracle", "simulation", "data"],
    body: `# SAK Switchboard Feed Simulation

## Real Agent Usage
> "Simulate this Switchboard feed and compare with current Pyth data."`,
  },
  {
    slug: "sak-token-pool-intel",
    name: "SAK Token & Pool Intelligence",
    category: "data",
    subcategory: "market-intelligence",
    description:
      "Retrieve trending pools, token info, and gainers data for strategy selection.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["tokens", "pools", "gainers", "market-intel"],
    body: `# SAK Token & Pool Intelligence

## Real Agent Usage
> "Find trending SOL pools with healthy liquidity and low recent volatility."`,
  },
  {
    slug: "sak-debridge-dln",
    name: "SAK deBridge DLN",
    category: "bridges",
    subcategory: "cross-chain-bridging",
    description:
      "Create, execute, and monitor deBridge DLN orders for cross-chain transfers.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["debridge", "dln", "bridge", "cross-chain"],
    body: `# SAK deBridge DLN

## Real Agent Usage
> "Bridge 0.5 SOL to Ethereum and monitor order status until fulfilled."`,
  },
  {
    slug: "sak-wormhole-bridge",
    name: "SAK Wormhole Bridge",
    category: "bridges",
    subcategory: "cross-chain-bridging",
    description:
      "Cross-chain token and messaging workflows through Wormhole integration.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["wormhole", "bridge", "cross-chain", "interop"],
    body: `# SAK Wormhole Bridge

## Real Agent Usage
> "Bridge this token to target chain and validate recipient address format before send."`,
  },
  {
    slug: "sak-sns-and-domains",
    name: "SAK SNS & Domains",
    category: "infrastructure",
    subcategory: "identity-domains",
    description:
      "Register and resolve Solana Name Service and related domain identity operations.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["sns", "domains", "identity", "solana"],
    body: `# SAK SNS & Domains

## Real Agent Usage
> "Resolve this .sol domain and verify the mapped wallet before transfer."`,
  },
  {
    slug: "sak-compressed-airdrop",
    name: "SAK Compressed Airdrop",
    category: "infrastructure",
    subcategory: "distribution-ops",
    description:
      "Execute Light Protocol compressed token airdrops with cost-aware recipient batching.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["airdrop", "compressed", "light-protocol", "distribution"],
    body: `# SAK Compressed Airdrop

## Real Agent Usage
> "Estimate cost for 1,000-recipient compressed airdrop, then execute if under budget."`,
  },
  {
    slug: "sak-gibwork-bounties",
    name: "SAK Gibwork Bounties",
    category: "infrastructure",
    subcategory: "non-financial-actions",
    description:
      "Register and manage Gibwork bounty actions as non-financial agent operations.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["gibwork", "bounties", "tasks", "solana"],
    body: `# SAK Gibwork Bounties

## Real Agent Usage
> "Register a bounty with this reward and acceptance criteria for on-chain contributors."`,
  },
  {
    slug: "sak-toolkit-connection-map",
    name: "SAK Toolkit Connection Map",
    category: "infrastructure",
    subcategory: "architecture",
    description:
      "Reference map showing how core runtime, plugins, and protocol skills connect in real agent workflows.",
    source_url: "https://github.com/sendaifun/solana-agent-kit",
    framework: "Solana Agent Kit",
    tags: ["architecture", "connections", "workflow", "setup"],
    body: `# SAK Toolkit Connection Map

## Layered Connection Model
1. Runtime: \`solana-agent-kit-core\`
2. Plugin layer: token / nft / defi / misc / blinks
3. Protocol skills: Jupiter, Drift, Raydium, Orca, Meteora, bridges, data
4. Agent flows: data -> decision -> execution -> bridge -> reporting

## Example Connected Flow
\`sak-pyth-price-feeds\` -> \`sak-jupiter-swap\` -> \`sak-drift-perps-vaults\` -> \`sak-debridge-dln\`

## Real Agent Usage
> "Plan a safe end-to-end flow from market signal to cross-chain settlement."`,
  },
] as const;
