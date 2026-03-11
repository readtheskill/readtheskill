import type { Skill } from "@/data/skills";

export const AWESOME_SOLANA_AI_SKILLS: Skill[] = [
    {
        slug: "magicblock-dev-skill",
        name: "MagicBlock Dev Skill",
        category: "coding",
        subcategory: "solana-development",
        description:
            "End-to-end MagicBlock development skill for Solana programs with low-latency and privacy-focused architecture patterns.",
        source_url: "https://github.com/magicblock-labs/magicblock-dev-skill",
        skill_url: "https://raw.githubusercontent.com/magicblock-labs/magicblock-dev-skill/main/skill/SKILL.md",
        framework: "Claude Code / Solana",
        tags: ["solana", "magicblock", "development", "latency", "privacy"],
    },
    {
        slug: "metaplex-official-skill",
        name: "Metaplex Skill (Official)",
        category: "nfts",
        subcategory: "nft-development",
        description:
            "Official Metaplex skill covering Core NFTs, Token Metadata, Bubblegum, Candy Machine, Genesis launches, and Umi/Kit SDK workflows.",
        source_url: "https://github.com/metaplex-foundation/skill",
        skill_url: "https://raw.githubusercontent.com/metaplex-foundation/skill/main/skills/metaplex/SKILL.md",
        framework: "Metaplex",
        tags: ["solana", "metaplex", "nft", "bubblegum", "candy-machine"],
    },
    {
        slug: "solana-anchor-claude-skill",
        name: "Solana Anchor Claude Skill",
        category: "coding",
        subcategory: "solana-development",
        description:
            "End-to-end Solana development skill for Anchor and Solana Kit with maintainable code patterns and production testing guidance.",
        source_url: "https://github.com/quiknode-labs/solana-anchor-claude-skill",
        skill_url:
            "https://raw.githubusercontent.com/quiknode-labs/solana-anchor-claude-skill/main/skills/solana-anchor-claude-skill/SKILL.md",
        framework: "Anchor / Solana Kit",
        tags: ["solana", "anchor", "solana-kit", "testing", "claude-code"],
    },
    {
        slug: "solana-game-skill",
        name: "Solana Game Skill",
        category: "coding",
        subcategory: "game-development",
        description:
            "Game-focused Solana skill for Claude Code covering Unity, React Native, Solana Mobile, and MagicBlock-native patterns.",
        source_url: "https://github.com/solanabr/solana-game-skill",
        skill_url: "https://raw.githubusercontent.com/solanabr/solana-game-skill/main/skill/SKILL.md",
        framework: "Solana / Unity / React Native",
        tags: ["solana", "gaming", "unity", "react-native", "magicblock"],
    },
    {
        slug: "solana-skills-plugin",
        name: "Solana Skills Plugin Bundle",
        category: "coding",
        subcategory: "solana-development",
        description:
            "Bundle of Solana-focused coding skills including development, security auditing, and ZK compression workflows.",
        source_url: "https://github.com/tenequm/claude-plugins/tree/main/skills",
        skill_url: "https://raw.githubusercontent.com/tenequm/claude-plugins/main/skills/solana-development/SKILL.md",
        framework: "Claude Code",
        tags: ["solana", "development", "security", "compression", "plugins"],
    },
    {
        slug: "octav-api-skill",
        name: "Octav API Skill",
        category: "data",
        subcategory: "portfolio-analytics",
        description:
            "Track Solana wallet portfolios, transaction history, DeFi positions, and token analytics with Octav API workflows.",
        source_url: "https://github.com/Octav-Labs/octav-api-skill",
        skill_url: "https://raw.githubusercontent.com/Octav-Labs/octav-api-skill/main/SKILL.md",
        framework: "Octav API",
        tags: ["solana", "portfolio", "analytics", "defi", "transactions"],
    },
    {
        slug: "pnp-markets-skill",
        name: "PNP Markets Skill",
        category: "prediction",
        subcategory: "prediction-protocols",
        description:
            "Permissionless prediction market skill for PNP Protocol with AMM and P2P market creation flows on Solana.",
        source_url: "https://github.com/pnp-protocol/solana-skill",
        skill_url: "https://raw.githubusercontent.com/pnp-protocol/solana-skill/main/SKILL.md",
        framework: "PNP Protocol",
        tags: ["solana", "prediction", "markets", "amm", "p2p"],
    },
    {
        slug: "sentients-skill",
        name: "Sentients",
        category: "experimental",
        subcategory: "agent-native-protocols",
        description:
            "AI agent-native protocol for autonomous wallet behavior and deterministic inscription/art workflows on Solana.",
        source_url: "https://github.com/koshmade/sentients.wtf",
        skill_url: "https://raw.githubusercontent.com/koshmade/sentients.wtf/main/public/skill.md",
        framework: "Sentients",
        tags: ["solana", "agents", "inscriptions", "autonomous", "experimental"],
    },
    {
        slug: "helius-skill",
        name: "Helius Skill",
        category: "infrastructure",
        subcategory: "rpc-infrastructure",
        description:
            "Helius RPC and API infrastructure skill covering DAS, enhanced transactions, webhooks, priority fees, and LaserStream.",
        source_url: "https://github.com/sendaifun/skills/tree/main/skills/helius",
        skill_url: "https://raw.githubusercontent.com/sendaifun/skills/main/skills/helius/SKILL.md",
        framework: "Helius",
        tags: ["solana", "rpc", "das", "webhooks", "infrastructure"],
    },
    {
        slug: "quicknode-blockchain-skills",
        name: "QuickNode Blockchain Skills",
        category: "infrastructure",
        subcategory: "rpc-infrastructure",
        description:
            "QuickNode-focused skill for Solana RPC, Jupiter API integrations, and Yellowstone gRPC workflows.",
        source_url: "https://github.com/quiknode-labs/blockchain-skills",
        skill_url:
            "https://raw.githubusercontent.com/quiknode-labs/blockchain-skills/main/skills/quicknode-skill/SKILL.md",
        framework: "QuickNode",
        tags: ["solana", "quicknode", "rpc", "yellowstone", "infrastructure"],
    },
    {
        slug: "solana-dev-skill-rent-free",
        name: "Solana Dev Skill (Rent-Free)",
        category: "coding",
        subcategory: "solana-development",
        description:
            "Rent-free Solana development skill set for client + Anchor/Pinocchio programs, token distribution, and ZK-compressed workflows.",
        source_url: "https://github.com/Lightprotocol/skills",
        skill_url:
            "https://raw.githubusercontent.com/Lightprotocol/skills/main/skills/solana-compression/SKILL.md",
        framework: "Light Protocol",
        tags: ["solana", "development", "compression", "anchor", "pinocchio"],
    },
] as const as Skill[];
