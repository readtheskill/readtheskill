import {
    CATEGORIES,
    SKILLS,
    inferSourceFromUrl,
    inferSubcategory,
} from "@/data/skills";

export const runtime = "nodejs";

export async function GET() {
    const categories = Object.keys(CATEGORIES);
    const skills = SKILLS.map((skill) => ({
        ...skill,
        kind: skill.kind ?? "skill",
        subcategory: inferSubcategory(skill),
        source: skill.source ?? inferSourceFromUrl(skill.source_url),
        verified: skill.verified ?? Boolean(skill.source_url?.startsWith("http")),
        page: `https://readtheskill.com/skills/${skill.category}/${skill.slug}`,
    }));

    return Response.json({
        name: "$SKILL Directory",
        description:
            "Curated skills and endpoint integrations for AI agents. Find what you need, tell your operator, get to work.",
        skills_url: "https://readtheskill.com/skills",
        skill_experiment: "https://readtheskill.com/skill.md",
        categories,
        skills,
    });
}
