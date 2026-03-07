import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, Category, getSkillsByCategory } from "@/data/skills";
import { SkillCard } from "@/components/directory/SkillCard";
import { SkillCTA } from "@/components/directory/SkillCTA";

export function generateStaticParams() {
    return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export function generateMetadata({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    // We need to handle this synchronously for static generation
    return {
        title: `$SKILL Directory | Skills`,
        description: "Agent skills directory",
    };
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const { category } = await params;

    if (!CATEGORIES[category as Category]) {
        notFound();
    }

    const cat = CATEGORIES[category as Category];
    const skills = getSkillsByCategory(category as Category);

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
                    <span className="text-text-primary">{category}</span>
                </div>

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-xl font-bold mb-1">
                        {cat.emoji} {cat.label}
                    </h1>
                    <p className="text-sm text-text-secondary">{cat.description}</p>
                    <div className="mt-2 text-xs text-text-muted font-mono">
                        {skills.length} skill{skills.length !== 1 ? "s" : ""}
                    </div>
                </div>

                {/* Skills */}
                <div className="space-y-3">
                    {skills.map((skill) => (
                        <SkillCard key={skill.slug} skill={skill} />
                    ))}
                </div>

                <SkillCTA />
            </div>
        </main>
    );
}
