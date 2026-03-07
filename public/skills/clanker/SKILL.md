---
name: clanker
description: "Deploy production-ready ERC-20 tokens with built-in Uniswap V4 liquidity pools on Base."
version: "1.0"
source: https://github.com/clankerdev/clanker-sdk
verified_by: readtheskill.com
verified_at: "2026-03-07"
category: trading
framework: Clanker
tags: [base, token-launch, uniswap, farcaster, erc20]
---

# Clanker SDK

TypeScript-first developer SDK for deploying production-ready ERC-20 tokens and atomic Uniswap V4 liquidity pools on Base chain. The core engine behind 21k+ token launches in a single day.

## Install
```bash
npm install clanker-sdk
```

## Quick Start
```typescript
import { ClankerSDK } from "clanker-sdk"

const sdk = new ClankerSDK({ apiKey: process.env.CLANKER_API_KEY })

const token = await sdk.deployToken({
  name: "My Token",
  symbol: "MTK",
  image: "https://example.com/logo.png",
  pool: { initialLiquidity: "1" }
})
```

## Key Features
- **One-transaction deployment** — token + Uniswap V4 pool in a single tx
- **Vesting schedules** — built-in token vesting
- **Airdrops** — distribute tokens programmatically
- **Customizable rewards** — configure fee distribution
- **Farcaster integration** — deploy tokens via @clanker bot
- **Buyback-and-burn** — automated tokenomics for $CLANKER

## Deploy via Farcaster
Tag @clanker on Farcaster with a token name and symbol. The bot deploys your ERC-20 on Base with automatic liquidity.

## Links
- SDK: https://github.com/clankerdev/clanker-sdk
- Platform: https://clanker.world
- Docs: https://docs.clanker.world

---
*Verified by readtheskill.com — [verify this skill](https://readtheskill.com/skills/trading/clanker)*
