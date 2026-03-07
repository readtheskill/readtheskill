---
name: just-fucking-cancel
description: "Claude Code skill that audits your subscriptions from bank CSVs and cancels them via browser automation."
version: "1.0"
source: https://github.com/rohunvora/just-fucking-cancel
verified_by: readtheskill.com
verified_at: "2026-03-07"
category: automation
framework: Claude Code
tags: [subscriptions, browser-automation, privacy, finance]
---

# Just Fucking Cancel

A Claude Code skill that teaches Claude how to audit your subscriptions. Drop in a bank transaction CSV, Claude identifies recurring charges, asks what you actually use, generates a report, then cancels what you don't want — via browser automation.

## Requirements
- Claude Code + Claude Pro ($20/month)
- A bank transaction CSV export

## Quick Start
```bash
git clone https://github.com/rohunvora/just-fucking-cancel.git
cd just-fucking-cancel
claude
> Audit my subscriptions
```

## How It Works
1. You provide a bank transaction CSV (Apple Card, Chase, etc.)
2. Claude identifies recurring charges — Netflix, Spotify, that gym membership, random SaaS
3. Claude asks you questions — "Do you use Hulu?" "When did you last open Adobe?"
4. You answer honestly — this is where the "oh shit, I forgot about that" moments happen
5. Claude generates an HTML audit report with everything categorized
6. Claude cancels for you (optional) — opens Chrome and clicks through cancellation flows

## The Audit Report
- ✅ Cancel — things you confirmed you don't use
- 🔍 Investigate — charges you're unsure about
- ✓ Keep — subscriptions you actually use
- 🔒 Privacy toggle — blur names before screenshotting

## Browser Automation
Tell Claude: "Help me cancel the subscriptions I marked for cancellation."
Claude opens Chrome, navigates to each service, clicks through cancellation flows, handles dark patterns, asks confirmation before final steps. You watch the whole thing happen.

## Privacy
- Transaction CSVs stay local — never uploaded anywhere
- Audit report is a local HTML file
- Nothing shared with the skill author

## Cost
- Claude Pro: $20/month
- This skill: Free

## Links
- GitHub: https://github.com/rohunvora/just-fucking-cancel
- Website: https://cancel-stuff.vercel.app

---
*Verified by readtheskill.com — [verify this skill](https://readtheskill.com/skills/automation/just-fucking-cancel)*
