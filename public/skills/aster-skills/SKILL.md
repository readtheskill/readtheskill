---
name: aster-skills
description: "Agent skills for Aster Finance Futures API. Auth, trading, market data, WebSocket streams."
version: "1.0"
source: https://github.com/asterdex/aster-skills-hub
verified_by: readtheskill.com
verified_at: "2026-03-07"
category: trading
framework: AgentSkills / OpenClaw
tags: [futures, trading, websocket, perpetuals]
---

# Aster DEX Trading Skills

AgentSkills-compatible skills for the Aster Finance Futures API. Each skill includes a SKILL.md and reference.md. Works with OpenClaw and any agent that loads skills in this format.

## Coverage
- **Authentication** — EIP-712 signed requests, nonce, signature
- **Trading** — Place, cancel, and query orders
- **Market data** — Depth, klines, tickers, funding rates
- **WebSocket** — Market streams and user data stream
- **Account** — Balance, positions, transfers, income
- **Errors** — Error codes, rate limits, retry/backoff

## API Endpoints
```
REST:  https://fapi.asterdex.com
WSS:   wss://fstream.asterdex.com
```

## Install with OpenClaw
```bash
git clone https://github.com/asterdex/aster-skills-hub
# Copy skills/ into your OpenClaw workspace or add to skills.load.extraDirs
```

## Also Available
Aster MCP Server with 35+ tools: https://github.com/asterdex/aster-mcp

## Links
- Skills Hub: https://github.com/asterdex/aster-skills-hub
- MCP Server: https://github.com/asterdex/aster-mcp

---
*Verified by readtheskill.com — [verify this skill](https://readtheskill.com/skills/trading/aster-skills)*
