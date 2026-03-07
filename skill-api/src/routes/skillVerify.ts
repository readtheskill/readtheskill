import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler";
import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";

const router = Router();

// GET /api/skills/verify?slug=coinbase-agentkit — verify a skill's SHA-256 hash
router.get(
    "/api/skills/verify",
    asyncHandler(async (req, res, _next) => {
        const slug = req.query.slug as string;

        if (!slug || typeof slug !== "string") {
            res.status(400).json({ error: "slug query parameter is required" });
            return;
        }

        // Sanitize slug to prevent path traversal
        const safeSlug = slug.replace(/[^a-z0-9-]/g, "");
        const skillPath = path.join(__dirname, "..", "..", "public", "skills", safeSlug, "SKILL.md");

        if (!fs.existsSync(skillPath)) {
            res.status(404).json({
                error: "SKILL_NOT_FOUND",
                slug: safeSlug,
                message: `No SKILL.md found for slug: ${safeSlug}`,
            });
            return;
        }

        const content = fs.readFileSync(skillPath, "utf-8");
        const hash = crypto.createHash("sha256").update(content).digest("hex");

        // Extract frontmatter metadata
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        const metadata: Record<string, string> = {};
        if (frontmatterMatch) {
            frontmatterMatch[1].split("\n").forEach((line) => {
                const [key, ...valueParts] = line.split(": ");
                if (key && valueParts.length) {
                    metadata[key.trim()] = valueParts.join(": ").replace(/^["']|["']$/g, "");
                }
            });
        }

        res.json({
            slug: safeSlug,
            verified: true,
            sha256: hash,
            skill_url: `https://readtheskill.com/skills/${safeSlug}/SKILL.md`,
            source: metadata.source || null,
            verified_by: metadata.verified_by || "readtheskill.com",
            verified_at: metadata.verified_at || null,
            name: metadata.name || safeSlug,
            category: metadata.category || null,
            framework: metadata.framework || null,
            how_to_verify: "Download the SKILL.md file and compute SHA-256. Compare with the sha256 field in this response.",
        });
    })
);

// GET /api/skills/list — list all available skills with hashes
router.get(
    "/api/skills/list",
    asyncHandler(async (req, res, _next) => {
        const skillsDir = path.join(__dirname, "..", "..", "public", "skills");
        const entries = fs.readdirSync(skillsDir, { withFileTypes: true });

        const skills = entries
            .filter((e) => e.isDirectory())
            .map((e) => {
                const skillPath = path.join(skillsDir, e.name, "SKILL.md");
                if (!fs.existsSync(skillPath)) return null;

                const content = fs.readFileSync(skillPath, "utf-8");
                const hash = crypto.createHash("sha256").update(content).digest("hex");

                return {
                    slug: e.name,
                    sha256: hash,
                    skill_url: `https://readtheskill.com/skills/${e.name}/SKILL.md`,
                    verify_url: `https://api.readtheskill.com/api/skills/verify?slug=${e.name}`,
                };
            })
            .filter(Boolean);

        res.json({
            count: skills.length,
            verified_by: "readtheskill.com",
            skills,
        });
    })
);

export default router;
