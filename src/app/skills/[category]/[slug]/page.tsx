import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, SKILLS, Category, getSkillBySlug } from "@/data/skills";
import { SkillCTA } from "@/components/directory/SkillCTA";

export function generateStaticParams() {
    return SKILLS.map((skill) => ({
        category: skill.category,
        slug: skill.slug,
    }));
}

export default async function SkillDetailPage({
    params,
}: {
    params: Promise<{ category: string; slug: string }>;
}) {
    const { category, slug } = await params;
    const skill = getSkillBySlug(category, slug);

    if (!skill) {
        notFound();
    }

    const cat = CATEGORIES[category as Category];

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-text-primary">
            <div className="max-w-3xl mx-auto px-4 py-10">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-6 text-xs text-text-muted">
                    <Link href="/" className="hover:text-text-primary no-underline">
                        home
                    </Link>
                    <span>/</span>
                    <Link href="/skills" className="hover:text-text-primary no-underline">
                        skills
                    </Link>
                    <span>/</span>
                    <Link
                        href={`/skills/${category}`}
                        className="hover:text-text-primary no-underline"
                    >
                        {category}
                    </Link>
                    <span>/</span>
                    <span className="text-text-primary">{slug}</span>
                </div>

                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-start justify-between gap-3 mb-2">
                        <h1 className="text-xl font-bold">{skill.name}</h1>
                        <span className="text-xs px-2 py-1 bg-bg-surface border border-border rounded text-text-muted font-mono flex-shrink-0 mt-1">
                            {skill.framework}
                        </span>
                    </div>
                    <p className="text-sm text-text-secondary">{skill.description}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs">
                        <span className="text-text-muted font-mono">
                            {cat.emoji} {cat.label}
                        </span>
                        <a
                            href={skill.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:underline"
                        >
                            Source →
                        </a>
                        {skill.skill_url && (
                            <a
                                href={skill.skill_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green hover:underline"
                            >
                                skill.md →
                            </a>
                        )}
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                    {skill.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-[10px] px-1.5 py-0.5 bg-bg-surface border border-border rounded text-text-muted font-mono"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Body */}
                <div className="bg-bg-elevated border border-border rounded p-5">
                    <pre className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap font-mono">
                        {skill.body}
                    </pre>
                </div>

                <SkillCTA />
            </div>
        </main>
    );
}
