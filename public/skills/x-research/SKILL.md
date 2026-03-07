---
name: x-research
description: "X/Twitter research skill for Claude Code and OpenClaw. Agentic search, thread following, watchlists, sourced briefings."
version: "1.0"
source: https://github.com/rohunvora/x-research-skill
verified_by: readtheskill.com
verified_at: "2026-03-07"
category: research
framework: Claude Code / OpenClaw
tags: [twitter, research, search, threads, watchlist]
---

# X Research

Wraps the X API into a fast CLI so your AI agent (or you) can search tweets, pull threads, monitor accounts, and get sourced research without writing curl commands.

## Install

### Claude Code
```bash
mkdir -p .claude/skills && cd .claude/skills
git clone https://github.com/rohunvora/x-research-skill.git x-research
```

### OpenClaw
```bash
mkdir -p skills && cd skills
git clone https://github.com/rohunvora/x-research-skill.git x-research
```

## Setup
Requires X API credentials. Set your API key via environment variable.

## Key Features
- Search with engagement sorting, time filtering, noise removal
- Quick mode for cheap, targeted lookups
- Watchlists for monitoring accounts
- Cache to avoid repeat API charges
- Cost transparency — every search shows what it cost

## Usage
Just talk to Claude naturally:
- "What are people saying about Solana right now?"
- "Find the most engaged tweets about AI agents this week"
- "Pull the full thread from this tweet"

## Links
- GitHub: https://github.com/rohunvora/x-research-skill

---
*Verified by readtheskill.com — [verify this skill](https://readtheskill.com/skills/research/x-research)*
