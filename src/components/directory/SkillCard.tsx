import Link from "next/link";
import { Skill, inferSubcategory } from "@/data/skills";
import { normalizeFrameworkLabel } from "@/lib/framework-labels";

export function SkillCard({ skill }: { skill: Skill }) {
    const subcategory = inferSubcategory(skill);
    return (
        <Link
            href={`/skills/${skill.category}/${skill.slug}`}
            className="block bg-bg-elevated border border-border rounded p-4 hover:border-green/50 transition-colors no-underline"
        >
            <div className="flex items-start justify-between gap-2 mb-2">
                <div className="font-bold text-text-primary text-sm">{skill.name}</div>
                <span className="text-[10px] px-1.5 py-0.5 bg-bg-surface border border-border rounded text-text-muted font-mono flex-shrink-0">
                    {normalizeFrameworkLabel(skill.framework)}
                </span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed mb-3">
                {skill.description}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] px-1.5 py-0.5 bg-bg-surface border border-border rounded text-text-muted font-mono">
                    {subcategory}
                </span>
                {skill.tags.slice(0, 3).map((tag) => (
                    <span
                        key={tag}
                        className="text-[10px] px-1.5 py-0.5 bg-bg-surface text-text-muted font-mono rounded"
                    >
                        {tag}
                    </span>
                ))}
                {skill.source_url && (
                    <span className="text-[10px] text-accent ml-auto">[view →]</span>
                )}
            </div>
        </Link>
    );
}
