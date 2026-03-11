---
name: openclaw-daily-ops
description: "Daily cost reporting plus zombie session cleanup for OpenClaw deployments."
version: "1.0"
source: https://github.com/oh-ashen-one/openclaw-daily-ops
verified_by: readtheskill.com
verified_at: "2026-03-10"
category: automation
framework: OpenClaw
tags: [openclaw, cost-reporting, cron, discord, session-cleanup]
---

# OpenClaw Daily Ops

Daily cost reporting + zombie session killer for OpenClaw deployments.

## What It Does

1. Parses OpenClaw session files and computes daily API cost totals
2. Posts a clean daily report to Discord (including trend + budget signals)
3. Resets stale sessions older than configured age/size thresholds

## Quick Start

```bash
git clone https://github.com/oh-ashen-one/openclaw-daily-ops
cd openclaw-daily-ops
cp config.example.json config.json
python3 scripts/cost_report.py --config config.json --dry-run
```

## Required Config

- `discord_webhook`
- `discord_user_id` (for high-cost ping alerts)
- session path inputs for your OpenClaw deployment
- cleanup thresholds such as `zombie_min_age_hours` and `zombie_min_size_mb`

## Suggested Agent Usage

> Set up nightly OpenClaw ops: post a daily cost report to Discord and reset zombie sessions older than 24h over 1MB context.

## Links

- Repository: https://github.com/oh-ashen-one/openclaw-daily-ops
- Skill source: https://github.com/oh-ashen-one/openclaw-daily-ops/blob/main/SKILL.md

---
*Verified by readtheskill.com — [verify this skill](https://readtheskill.com/skills/automation/openclaw-daily-ops)*
