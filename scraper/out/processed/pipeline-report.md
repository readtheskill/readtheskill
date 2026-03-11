# ClawHub Ingestion Pipeline Report

Generated: 2026-03-11T19:30:21.034Z

## Summary

| Metric | Count |
|--------|-------|
| Discovered slugs | 200 |
| Resolved SKILL.md URLs | 0 |
| Valid content | 0 |
| Categorized | 200 |
| **New skills** | 199 |
| **Enrichments** | 0 |
| Skipped (duplicates) | 1 |

## By Category

| Category | Count |
|----------|-------|
| wallets | 45 |
| nfts | 37 |
| trading | 30 |
| defi | 30 |
| coding | 17 |
| infrastructure | 10 |
| prediction | 5 |
| data | 5 |
| bridges | 4 |
| social | 3 |
| design | 3 |
| research | 3 |
| endpoints | 2 |
| experimental | 2 |
| productivity | 2 |
| communication | 1 |
| legal | 1 |

## By Tier

| Tier | Count |
|------|-------|
| indexed | 200 |

## Sample New Skills (first 20)

| Slug | Name | Category | Tier |
|------|------|----------|------|
| solana | Solana | nfts | indexed |
| solana-transfer | Solana Transfer | nfts | indexed |
| solana-basics | solana-skill | trading | indexed |
| solana-swaps | Solana Swaps | trading | indexed |
| solana-skills | Solana | wallets | indexed |
| solana-easy-swap | Solana Easy Swap | trading | indexed |
| solana-sniper-bot | Solana Sniper Bot | trading | indexed |
| solana-payments-wallets-trading | Solana CLI for trading, prediction markets, defi and x402 payments | trading | indexed |
| solana-funding-arb | Solana Funding Rate Arbitrage | trading | indexed |
| solana-dev | Solana Dev | coding | indexed |
| solana-funding-arb-cn | Solana Funding Arb Cn | trading | indexed |
| solana-copy-trader | Solana Copy Trader | trading | indexed |
| solana-wallet | Solana + Polymarket + X Wallet Agent | wallets | indexed |
| colony-solana | Colony Solana | trading | indexed |
| gank-solana-bundler | solana-bundler-sniper-volume-bot | wallets | indexed |
| solana-trade | Solana Trade | trading | indexed |
| solana-payments-wallet-dev | solana-payments-wallet-dev | wallets | indexed |
| solana-compression-dev | solana-compression-dev | coding | indexed |
| solana-token-distribution | solana-token-distribution | defi | indexed |
| solana-market | Solana Market | prediction | indexed |

## Output Files

- `src/data/skills-batch-clawhub.ts` - New skills ready to import
- `scraper/out/processed/enrichments.json` - Enrichment data
- `scraper/out/processed/processed-records.json` - Full processed data
- `scraper/out/raw/` - Raw API responses
