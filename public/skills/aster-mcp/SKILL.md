---
name: aster-mcp
description: "MCP server with 35+ tools for Aster spot and futures trading."
version: "1.0"
source: https://github.com/asterdex/aster-mcp
verified_by: readtheskill.com
verified_at: "2026-03-07"
category: trading
framework: MCP
tags: [mcp, futures, spot, trading, cursor]
---

# Aster MCP Server

Full MCP server for Aster DEX. Encrypted API key storage, multi-account support, HMAC and EIP-712 auth. Use with Cursor, Claude, or any MCP client.

## Install
```bash
pip install git+https://github.com/asterdex/aster-mcp.git
```

## Quick Start
```bash
aster-mcp config      # Configure account (interactive)
aster-mcp start       # Start MCP service
aster-mcp test main   # Test connection
```

## 35+ Tools

**Futures:** get_ticker, get_order_book, get_klines, get_funding_rate, create_order, cancel_order, cancel_all_orders, get_positions, get_balance, set_leverage, set_margin_mode, transfer_funds, get_income, get_commission_rate

**Spot:** get_spot_ticker, get_spot_price, get_spot_order_book, create_spot_order, cancel_spot_order, get_spot_account, get_spot_my_trades, transfer_spot_futures

**System:** config, list, start, stop, status, test, backup

## Use With Cursor
```
python -m aster_mcp.simple_server
```
Then use natural language: "Get Aster BTC price" or "Place an Aster order"

## Links
- GitHub: https://github.com/asterdex/aster-mcp
- Integration Guide: https://github.com/asterdex/aster-mcp/blob/main/docs/Aster-MCP-External-Integration.md

---
*Verified by readtheskill.com — [verify this skill](https://readtheskill.com/skills/trading/aster-mcp)*
