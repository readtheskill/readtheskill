---
name: solana-dev-skill
description: "Official Solana development playbook. Framework-kit-first, Anchor/Pinocchio, testing, security."
version: "1.0"
source: https://solana.com/SKILL.md
verified_by: readtheskill.com
verified_at: "2026-03-07"
category: defi
framework: Solana Foundation
tags: [solana, development, anchor, pinocchio, testing]
---

# Solana Dev Skill

End-to-end Solana development playbook from the Solana Foundation. Opinionated, framework-kit-first approach.

## When To Use
- Solana dApp UI work (React / Next.js)
- Wallet connection + signing flows
- Transaction building / sending / confirmation UX
- On-chain program development (Anchor or Pinocchio)
- Client SDK generation (Codama typed clients)
- Local testing (LiteSVM, Mollusk, Surfpool)
- Security hardening and audit-style reviews

## Default Stack (Opinionated)
1. **UI**: `@solana/client` + `@solana/react-hooks` (framework-kit first)
2. **SDK**: `@solana/kit` (Kit types, Address, Signer, codecs)
3. **Legacy**: `@solana/web3-compat` as boundary adapter (don't leak web3.js)
4. **Programs**: Anchor (fast iteration, IDL) or Pinocchio (CU optimization, minimal binary)
5. **Testing**: LiteSVM/Mollusk (unit), Surfpool (integration)

## Operating Procedure
1. Classify the task layer (UI / SDK / Program / Testing / Infra)
2. Pick the right building blocks
3. Implement with Solana-specific correctness (cluster, fee payer, compute budget, token program variant)
4. Add tests (unit → integration)
5. Deliver with diffs, install commands, risk notes

## Progressive Disclosure
Detailed docs: frontend framework-kit, Kit↔web3.js interop, Anchor programs, Pinocchio programs, testing strategy, IDL codegen, payments, security.

## Links
- Source: https://solana.com/SKILL.md
- Native dev skills from the Solana Foundation

---
*Verified by readtheskill.com — [verify this skill](https://readtheskill.com/skills/defi/solana-dev-skill)*
