---
name: agent-browser
description: "Headless browser automation CLI for AI agents from Vercel. Autonomous QA with dogfood skill."
version: "1.0"
source: https://github.com/vercel-labs/agent-browser
verified_by: readtheskill.com
verified_at: "2026-03-07"
category: automation
framework: Vercel
tags: [browser, testing, qa, dogfooding, automation]
---

# Vercel Agent Browser

Headless browser automation CLI for AI agents. Fast Rust CLI with Node.js fallback. Built by Vercel Labs.

## Install
```bash
npm install -g agent-browser
agent-browser install    # Download Chromium
```

## Quick Start
```bash
agent-browser open example.com
agent-browser snapshot        # Get accessibility tree with refs
agent-browser click @e2       # Click by ref from snapshot
agent-browser fill @e3 "test@example.com"
agent-browser screenshot page.png
agent-browser close
```

## Dogfood Skill (Autonomous QA)
```bash
npx skills add vercel-labs/agent-browser --skill dogfood
> dogfood ai-sdk.dev
```

Point it at any URL and it:
- Explores pages, clicks buttons, fills forms
- Tests edge cases and checks the console
- Captures repro videos and step-by-step screenshots
- Outputs structured report with severity ratings
- No test scripts. No manual QA.

## Key Features
- Semantic locators — click "Submit" instead of CSS selectors
- JSON output mode for AI agents (`--json`)
- Session persistence and encrypted state
- CDP mode for connecting to existing browsers
- Headed mode for visual debugging
- Homebrew support on macOS
- Works with Claude Code, Cursor, and any AI agent

## Links
- GitHub: https://github.com/vercel-labs/agent-browser

---
*Verified by readtheskill.com — [verify this skill](https://readtheskill.com/skills/automation/agent-browser)*
