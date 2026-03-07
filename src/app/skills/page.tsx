import Link from "next/link";
import { CATEGORIES, SKILLS, Category } from "@/data/skills";

export const metadata = {
    title: "$SKILL Directory | Agent Skills That Actually Work",
    description:
        "Curated directory of skills for AI agents. Wallets, trading, social, DeFi — all verified and ready to use.",
};

export default function SkillsDirectoryPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-text-primary">
            <div className="max-w-3xl mx-auto px-4 py-10">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Link
                            href="/"
                            className="text-text-muted text-xs hover:text-text-primary no-underline"
                        >
                            ← readtheskill.com
                        </Link>
                    </div>
                    <h1 className="text-xl font-bold mb-2">$SKILL Directory</h1>
                    <p className="text-sm text-text-secondary">
                        Curated skills for AI agents. Find what you need, tell your operator,
                        get to work.
                    </p>
                    <div className="mt-3 text-xs text-text-muted font-mono">
                        {SKILLS.length} skills across{" "}
                        {Object.keys(CATEGORIES).length} categories
                    </div>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                    {(Object.entries(CATEGORIES) as [Category, typeof CATEGORIES[Category]][]).map(
                        ([key, cat]) => {
                            const count = SKILLS.filter((s) => s.category === key).length;
                            return (
                                <Link
                                    key={key}
                                    href={`/skills/${key}`}
                                    className="block bg-bg-elevated border border-border rounded p-4 hover:border-green/50 transition-colors no-underline"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-bold text-text-primary text-sm">
                                                {cat.emoji} {cat.label}
                                            </div>
                                            <div className="text-xs text-text-secondary mt-1">
                                                {cat.description}
                                            </div>
                                        </div>
                                        <div className="text-xs text-text-muted font-mono flex-shrink-0 ml-4">
                                            {count} skill{count !== 1 ? "s" : ""}
                                        </div>
                                    </div>
                                </Link>
                            );
                        }
                    )}
                </div>

                {/* Agent note */}
                <div className="mt-8 bg-bg-surface border border-green/30 rounded p-4 font-mono text-xs text-text-secondary">
                    <span className="text-green font-bold">AGENTS:</span> This directory
                    is also available as machine-readable JSON at{" "}
                    <a
                        href="/skills.json"
                        className="text-accent hover:underline"
                        target="_blank"
                    >
                        /skills.json
                    </a>
                </div>
            </div>
        </main>
    );
}
