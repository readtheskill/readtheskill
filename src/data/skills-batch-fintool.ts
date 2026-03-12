import type { Skill } from "@/data/skills";

export const FINTOOL_SKILLS: Skill[] = [
    {
        slug: "fintool-suite",
        name: "fintool Suite",
        category: "data",
        subcategory: "market-intelligence",
        description:
            "Exchange-agnostic market intelligence CLI for quotes, news, and SEC filings, with JSON output for agent automation.",
        source_url: "https://github.com/second-state/fintool",
        skill_url: "https://raw.githubusercontent.com/second-state/fintool/main/skills/SKILL.md",
        framework: "OpenClaw / Rust CLI",
        tags: ["fintool", "market-data", "news", "sec-filings", "agentic-trading"],
    },
    {
        slug: "fintool-hyperliquid-cli",
        name: "fintool Hyperliquid CLI",
        category: "trading",
        subcategory: "perps-trading",
        description:
            "Hyperliquid trading binary from fintool for spot, perps, deposits, withdrawals, and bridge workflows in JSON mode.",
        source_url: "https://github.com/second-state/fintool",
        skill_url: "https://raw.githubusercontent.com/second-state/fintool/main/skills/SKILL.md",
        framework: "OpenClaw / Hyperliquid",
        tags: ["fintool", "hyperliquid", "perps", "spot", "bridge"],
    },
    {
        slug: "fintool-binance-cli",
        name: "fintool Binance CLI",
        category: "trading",
        subcategory: "cex-trading",
        description:
            "Binance trading binary from fintool for spot and perp execution with structured JSON command mode.",
        source_url: "https://github.com/second-state/fintool",
        skill_url: "https://raw.githubusercontent.com/second-state/fintool/main/skills/SKILL.md",
        framework: "OpenClaw / Binance",
        tags: ["fintool", "binance", "cex", "perps", "json-cli"],
    },
    {
        slug: "fintool-coinbase-cli",
        name: "fintool Coinbase CLI",
        category: "trading",
        subcategory: "cex-trading",
        description:
            "Coinbase trading binary from fintool for spot orders, balances, deposits, and withdrawals in JSON mode.",
        source_url: "https://github.com/second-state/fintool",
        skill_url: "https://raw.githubusercontent.com/second-state/fintool/main/skills/SKILL.md",
        framework: "OpenClaw / Coinbase",
        tags: ["fintool", "coinbase", "cex", "spot-trading", "json-cli"],
    },
    {
        slug: "fintool-okx-cli",
        name: "fintool OKX CLI",
        category: "trading",
        subcategory: "cex-trading",
        description:
            "OKX trading binary from fintool for spot, perps, funding/trading transfers, and market data commands.",
        source_url: "https://github.com/second-state/fintool",
        skill_url: "https://raw.githubusercontent.com/second-state/fintool/main/skills/SKILL.md",
        framework: "OpenClaw / OKX",
        tags: ["fintool", "okx", "cex", "perps", "funding-transfer"],
    },
    {
        slug: "fintool-polymarket-cli",
        name: "fintool Polymarket CLI",
        category: "prediction",
        subcategory: "prediction-trading",
        description:
            "Polymarket binary from fintool for listing markets, quoting outcomes, and trading prediction shares.",
        source_url: "https://github.com/second-state/fintool",
        skill_url: "https://raw.githubusercontent.com/second-state/fintool/main/skills/SKILL.md",
        framework: "OpenClaw / Polymarket",
        tags: ["fintool", "polymarket", "prediction-markets", "polygon", "event-trading"],
    },
    {
        slug: "fintool-openclaw-skill",
        name: "fintool OpenClaw Skill",
        category: "automation",
        subcategory: "agent-integration",
        description:
            "Primary OpenClaw skill file for fintool that defines setup checks, command schemas, and workflow patterns.",
        source_url: "https://github.com/second-state/fintool",
        skill_url: "https://raw.githubusercontent.com/second-state/fintool/main/skills/SKILL.md",
        framework: "OpenClaw",
        tags: ["openclaw", "fintool", "skill-md", "automation", "workflow"],
    },
    {
        slug: "fintool-openclaw-install",
        name: "fintool OpenClaw Installer",
        category: "automation",
        subcategory: "agent-installation",
        description:
            "Installer guide for fintool OpenClaw integration, including bootstrap and binary setup workflow.",
        source_url: "https://github.com/second-state/fintool",
        skill_url: "https://raw.githubusercontent.com/second-state/fintool/main/skills/install.md",
        framework: "OpenClaw",
        tags: ["openclaw", "fintool", "install", "bootstrap", "agent-setup"],
    },
];
