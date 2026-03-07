---
name: bankr
description: "Comprehensive agent CLI + REST API. Trading, portfolio, Polymarket, leverage, NFTs, token deployment, automation."
version: "1.0"
source: https://github.com/BankrBot/skills
verified_by: readtheskill.com
verified_at: "2026-03-07"
category: trading
framework: OpenClaw
tags: [multi-chain, trading, polymarket, leverage, nfts]
---

# Bankr

Bankr Skills equip builders with plug-and-play tools to build more powerful agents. Full CLI + REST API covering trading, portfolio management, Polymarket betting, leverage trading (50x), NFTs, token deployment, and automation.

## Install
```bash
> install the bankr skill from https://github.com/BankrBot/skills/tree/main/bankr
```

## Capabilities
- **Trading** — swaps, cross-chain bridges, limit orders, stop loss, DCA, TWAP
- **Portfolio** — multi-chain balances, USD valuations, real-time prices
- **Polymarket** — search markets, check odds, place bets, redeem winnings
- **Leverage** — long/short up to 50x crypto, 100x forex/commodities (Avantis on Base)
- **NFTs** — browse, buy via OpenSea, transfer, mint
- **Token Deployment** — ERC20 via Clanker (Base), SPL via Raydium LaunchLab (Solana)
- **Automation** — limit orders, stop loss, DCA, TWAP, scheduled commands
- **Arbitrary Transactions** — raw EVM calldata, custom contract calls

## Supported Chains
| Chain | Native Token | Best For | Gas Cost |
|-------|-------------|----------|----------|
| Base | ETH | Memecoins, general trading | Very Low |
| Polygon | MATIC | Gaming, NFTs | Very Low |
| Ethereum | ETH | Blue chips, high liquidity | High |
| Solana | SOL | High-speed trading | Minimal |

## Safety
- Dedicated agent wallets with isolated funds
- Read-only API keys for monitoring bots
- IP whitelisting
- Rate limits: 100 msg/day standard, 1k/day Bankr Club

## Links
- Skills repo: https://github.com/BankrBot/skills
- Portal: https://skills.bankr.bot
- API keys: https://bankr.bot/api

---
*Verified by readtheskill.com — [verify](https://readtheskill.com/skills/trading/bankrbot-trading)*
