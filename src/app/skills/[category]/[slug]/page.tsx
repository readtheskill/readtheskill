import Link from "next/link";
import { notFound } from "next/navigation";
import {
    CATEGORIES,
    SKILLS,
    Category,
    Skill,
    getSkillBySlug,
    inferSourceFromUrl,
    inferSubcategory,
} from "@/data/skills";
import { SkillCTA } from "@/components/directory/SkillCTA";
import { CategoryIcon } from "@/components/directory/CategoryIcon";
import { normalizeFrameworkLabel } from "@/lib/framework-labels";
import fs from "fs";
import path from "path";

/** Fetch skill.md content from remote skill_url */
async function fetchSkillContent(url: string): Promise<string> {
    try {
        const res = await fetch(toRawMarkdownUrl(url), { next: { revalidate: 3600 } });
        if (!res.ok) return "";
        const raw = await res.text();
        // Guard against HTML pages (e.g., github.com/blob links).
        if (/<(html|!doctype)/i.test(raw)) return "";
        return parseSkillMd(raw);
    } catch {
        return "";
    }
}

function toRawMarkdownUrl(url: string): string {
    try {
        const parsed = new URL(url);
        if (parsed.hostname === "github.com") {
            const parts = parsed.pathname.split("/").filter(Boolean);
            // /owner/repo/blob/branch/path/to/file.md -> raw.githubusercontent.com/owner/repo/branch/path/to/file.md
            if (parts.length >= 5 && parts[2] === "blob") {
                const [owner, repo, , branch, ...filePath] = parts;
                return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath.join("/")}`;
            }
        }
    } catch {
        return url;
    }
    return url;
}

/** Try multiple paths to find the SKILL.md for a given slug */
function loadSkillContent(slug: string): string {
    const publicDir = path.join(process.cwd(), "public", "skills");
    // Direct path: public/skills/{slug}/SKILL.md
    const directPath = path.join(publicDir, slug, "SKILL.md");
    if (fs.existsSync(directPath)) {
        return parseSkillMd(fs.readFileSync(directPath, "utf-8"));
    }
    // Search subdirectories: public/skills/{subdir}/{slug}/SKILL.md
    const subdirs = ["trading", "data", "infrastructure", "research", "automation", "nfts"];
    for (const sub of subdirs) {
        const subPath = path.join(publicDir, sub, slug, "SKILL.md");
        if (fs.existsSync(subPath)) {
            return parseSkillMd(fs.readFileSync(subPath, "utf-8"));
        }
    }
    return "";
}

/** Strip YAML frontmatter (between --- delimiters) and return the body */
function parseSkillMd(raw: string): string {
    const trimmed = raw.trim();
    if (trimmed.startsWith("---")) {
        const endIdx = trimmed.indexOf("---", 3);
        if (endIdx !== -1) {
            return trimmed.slice(endIdx + 3).trim();
        }
    }
    return trimmed;
}

function isIncompleteSkillBody(body: string): boolean {
    const trimmed = body.trim();
    if (!trimmed) return true;

    // Common placeholder form currently present in many local SKILL.md files.
    const stubPattern =
        /^#\s+[^\n]+\n\*Verified by readtheskill\.com — \[verify(?: this skill)?\]\(https:\/\/readtheskill\.com\/skills\/[^\n]+\)\*$/i;
    if (stubPattern.test(trimmed)) return true;

    // Very short markdown with only title + verification footer is also incomplete.
    const lines = trimmed.split("\n").filter((l) => l.trim().length > 0);
    const hasOnlyTitleAndVerify =
        lines.length <= 2 &&
        /^#\s+/.test(lines[0] ?? "") &&
        /Verified by readtheskill\.com/i.test(lines[1] ?? "");

    return hasOnlyTitleAndVerify;
}

function generateFallbackSkillBody(skill: Skill): string {
    const heading = `# ${skill.name}`;
    const overview = `${skill.description}`;
    const tags = skill.tags.length ? skill.tags.map((t) => `\`${t}\``).join(", ") : "N/A";

    return `${heading}

${overview}

## Quick Context
- Category: \`${skill.category}\`
- Framework: \`${skill.framework}\`
- Tags: ${tags}

## Suggested Agent Usage
> Use ${skill.name} when you need ${skill.description.toLowerCase()}

## Input Checklist
- wallet/public key available
- token/pair identifiers provided
- amount and slippage/risk bounds defined
- chain/RPC environment confirmed

## Output Checklist
- action summary and key parameters
- tx hash/signature (if execution occurred)
- result status and any errors
- next-step recommendation

## Links
- Source: ${skill.source_url}
${skill.skill_url ? `- skill.md: ${skill.skill_url}` : ""}
`;
}

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
    const rawBody =
        skill.body ||
        (skill.skill_url ? await fetchSkillContent(skill.skill_url) : "") ||
        loadSkillContent(slug);
    const body = isIncompleteSkillBody(rawBody) ? generateFallbackSkillBody(skill) : rawBody;
    const source = skill.source ?? inferSourceFromUrl(skill.source_url);
    const subcategory = inferSubcategory(skill);

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
                            {normalizeFrameworkLabel(skill.framework)}
                        </span>
                    </div>
                    <p className="text-sm text-text-secondary">{skill.description}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs">
                        <span className="text-text-muted font-mono flex items-center gap-1.5">
                            <CategoryIcon category={category as Category} size={14} />
                            {cat.label}
                        </span>
                        <span className="text-text-muted font-mono">
                            {subcategory}
                        </span>
                        <span className="text-text-muted font-mono">{source}</span>
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
                {body && (
                    <div className="bg-bg-elevated border border-border rounded p-5">
                        <pre className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap font-mono">
                            {body}
                        </pre>
                    </div>
                )}

                <SkillCTA />
            </div>
        </main>
    );
}
