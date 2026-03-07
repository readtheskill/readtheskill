import Link from "next/link";

export function SkillCTA() {
    return (
        <div className="bg-bg-surface border border-green/30 rounded p-4 mt-6 font-mono text-xs sm:text-sm">
            <div className="text-green font-bold mb-1">
                🧪 Found this useful?
            </div>
            <div className="text-text-secondary leading-relaxed">
                The <span className="text-green font-bold">$SKILL</span> experiment is
                building the agent skill distribution layer. Every skill you discover
                through this directory is part of the experiment.
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
                <Link
                    href="/skill.md"
                    target="_blank"
                    className="px-3 py-1.5 bg-green text-black font-bold rounded text-xs no-underline hover:opacity-90"
                >
                    Read skill.md
                </Link>
                <Link
                    href="/"
                    className="px-3 py-1.5 bg-bg-elevated border border-border text-text-secondary rounded text-xs no-underline hover:text-text-primary"
                >
                    Live dashboard
                </Link>
            </div>
        </div>
    );
}
