# ClawHub Ingestion Pipeline Report

Generated: 2026-03-12T19:29:26.039Z

## Summary

| Metric | Count |
|--------|-------|
| Discovered slugs | 3187 |
| Resolved SKILL.md URLs | 0 |
| Valid content | 0 |
| Categorized | 3184 |
| **New skills** | 2972 |
| **Enrichments** | 10 |
| Skipped (duplicates) | 202 |

## By Category

| Category | Count |
|----------|-------|
| coding | 493 |
| automation | 369 |
| productivity | 309 |
| social | 292 |
| design | 275 |
| data | 236 |
| research | 203 |
| trading | 191 |
| experimental | 123 |
| communication | 98 |
| marketing | 98 |
| wallets | 97 |
| infrastructure | 95 |
| defi | 94 |
| endpoints | 37 |
| prediction | 36 |
| bridges | 32 |
| oracles | 31 |
| legal | 26 |
| nfts | 25 |
| finance | 14 |
| hr | 10 |

## By Tier

| Tier | Count |
|------|-------|
| indexed | 3184 |

## Sample New Skills (first 20)

| Slug | Name | Category | Tier |
|------|------|----------|------|
| crypto-agent-payments | Crypto Wallets & Payments for AI Agents | wallets | indexed |
| warden-app | Warden App | wallets | indexed |
| nexwave-gateway | Nexwave Gateway | wallets | indexed |
| clawmegle-staking | clawmegle staking | defi | indexed |
| pocket-money | pocket-money | wallets | indexed |
| fund | Fund | wallets | indexed |
| paygents | PayGents | wallets | indexed |
| amazon-checkout | CreditClaw Amazon | Order & Checkout at Amazon.com securely | wallets | indexed |
| clankerkit | ClankerKit | wallets | indexed |
| senddy | Senddy | wallets | indexed |
| pet-operator | Pet Operator | wallets | indexed |
| polymarket-proxy-trader | Polymarket Proxy Trader | wallets | indexed |
| bsc-dev-monitor-v2 | Bsc Dev Monitor Skill | wallets | indexed |
| token-approval-checker | Token Approval Checker | wallets | indexed |
| whale-shark | Whale Shark | wallets | indexed |
| orderly-sdk-trading-workflows | Orderly Sdk Trading Workflows | trading | indexed |
| trading | Trading | trading | indexed |
| trading-coach | Trading Coach | trading | indexed |
| day-trading-skill | Day Trading Investor Pro | trading | indexed |
| hyperliquid-trading | Hyperliquid Trading & Analysis | trading | indexed |

## Sample Enrichments (first 10)

| Existing Slug | New Data From | Reason |
|---------------|---------------|--------|
| solana-easy-swap | solana-easy-swap | New entry richer: 6.0 vs 3.4 |
| ethereum-wingman | ethereum-wingman | New entry richer: 6.0 vs 3.8 |
| zapper | zapper | New entry richer: 6.0 vs 3.5 |
| safe-multisig | safe-multisig | New entry richer: 5.0 vs 0.0 |
| safe-multisig-skill | safe-multisig-skill | New entry richer: 5.0 vs 0.0 |
| nft-tracker | nft-tracker | New entry richer: 5.5 vs 3.3 |
| gizmolab-tools | gizmolab-tools | New entry richer: 6.0 vs 1.1 |
| wallet-pnl | wallet-pnl | New entry richer: 4.6 vs 2.3 |
| dexscreener | dexscreener | New entry richer: 5.2 vs 3.0 |
| clanker | clanker | New entry richer: 5.8 vs 3.4 |

## Output Files

- `src/data/skills-batch-clawhub.ts` - New skills ready to import
- `scraper/out/processed/enrichments.json` - Enrichment data
- `scraper/out/processed/processed-records.json` - Full processed data
- `scraper/out/raw/` - Raw API responses
