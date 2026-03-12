---
name: meteora-swap
description: "Swap and liquidity workflows for Meteora on Solana, including DLMM-aware execution planning."
version: "1.0"
source: https://github.com/sendaifun/solana-agent-kit
verified_by: readtheskill.com
verified_at: "2026-03-07"
category: trading
framework: Solana Agent Kit
tags: [solana, meteora, dlmm, swaps, liquidity]
---

# Meteora Swap

Use this skill when an agent needs to execute or prepare Solana token swaps and liquidity actions on Meteora, especially for DLMM-style pools where depth and slippage behavior can change quickly.

## What This Skill Covers

- Meteora swap intent formatting
- Pre-trade checks before execution
- DLMM-aware route and size decisions
- Post-trade verification and reporting

## Recommended Agent Workflow

1. Validate wallet and token accounts
2. Fetch quote and expected output
3. Compare slippage impact against policy
4. Build unsigned transaction
5. Sign and submit through your Solana execution stack
6. Confirm settlement and log tx metadata

## Input Template (Agent -> Executor)

```json
{
  "action": "meteora_swap",
  "input_mint": "So11111111111111111111111111111111111111112",
  "output_mint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "amount": "1000000000",
  "slippage_bps": 80,
  "wallet": "<public-key>"
}
```

## Guardrails

- Reject trades above max allowed notional
- Reject if projected slippage exceeds policy threshold
- Reject if destination token account is missing and auto-create is disabled
- Log quote timestamp to avoid stale execution

## Example Agent Prompt

> Swap 1 SOL to USDC on Meteora with max 0.8% slippage. Return quote, route details, tx signature, and final received amount.

## Output Contract

Return a structured result:

- Requested pair and amount
- Quoted output and minimum output
- Effective price impact
- Transaction signature
- Final settlement status

## Links

- Solana Agent Kit: https://github.com/sendaifun/solana-agent-kit
- Meteora: https://www.meteora.ag

---
*Verified by readtheskill.com — [verify this skill](https://readtheskill.com/skills/trading/meteora-swap)*
