---
name: opensea-cli
description: "Query NFTs, listings, swaps, and more from the command line or programmatically."
version: "1.0"
source: https://github.com/ProjectOpenSea/opensea-cli
verified_by: readtheskill.com
verified_at: "2026-03-07"
category: trading
framework: OpenSea
tags: [nft, opensea, collections, marketplace]
---

# OpenSea CLI & SDK

Query the OpenSea API from the command line or programmatically. Full SDK with collections, tokens, events, listings, offers, swaps, and search.

## Install
```bash
npm install -g @opensea/cli
# or use without installing:
npx @opensea/cli collections get mfers
```

## Authentication
```bash
export OPENSEA_API_KEY=your-api-key
# Get a key at docs.opensea.io
```

## CLI Commands
```bash
opensea collections get mfers           # Collection details
opensea collections stats mfers         # Floor price + volume
opensea nfts list-by-collection mfers   # List NFTs
opensea listings best mfers --limit 5   # Best listings
opensea search collections "cool cats"  # Search
opensea tokens trending --limit 5       # Trending tokens
opensea --format table collections stats mfers
```

## Available Commands
`collections`, `nfts`, `listings`, `offers`, `events`, `search`, `tokens`, `swaps`, `accounts`

## Programmatic SDK
```javascript
import { OpenSeaCLI } from "@opensea/cli"

const client = new OpenSeaCLI({
  apiKey: process.env.OPENSEA_API_KEY
})

const collection = await client.collections.get("mfers")
const { nfts } = await client.nfts.listByCollection("mfers", { limit: 5 })
const { listings } = await client.listings.best("mfers", { limit: 10 })
const { tokens } = await client.tokens.trending({ chains: ["base"], limit: 5 })
```

## Agent Skill Format
```bash
npx skills add ProjectOpenSea/opensea-skill
```

## Links
- GitHub: https://github.com/ProjectOpenSea/opensea-cli
- CLI Reference: https://github.com/ProjectOpenSea/opensea-cli/blob/main/docs/cli-reference.md
- SDK Reference: https://github.com/ProjectOpenSea/opensea-cli/blob/main/docs/sdk.md

---
*Verified by readtheskill.com — [verify this skill](https://readtheskill.com/skills/trading/opensea-cli)*
