import * as fs from "fs";
import * as path from "path";

export interface ExistingSkillEntry {
  slug: string;
  name: string;
  source_url?: string;
  skill_url?: string;
  category: string;
  subcategory?: string;
  tags?: string[];
  description?: string;
  hasBody: boolean;
}

export interface ExistingRegistry {
  bySlug: Map<string, ExistingSkillEntry>;
  byRepo: Map<string, ExistingSkillEntry[]>;
  bySkillUrl: Map<string, ExistingSkillEntry>;
  all: ExistingSkillEntry[];
}

function extractRepoKey(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (match) {
    return `${match[1].toLowerCase()}/${match[2].toLowerCase().replace(/\.git$/, "")}`;
  }
  return null;
}

function parseSkillsFromFile(filePath: string): ExistingSkillEntry[] {
  const content = fs.readFileSync(filePath, "utf-8");
  const entries: ExistingSkillEntry[] = [];

  const skillMatches = content.matchAll(
    /\{\s*slug:\s*["']([^"']+)["'][^}]*name:\s*["']([^"']+)["'][^}]*\}/gs
  );

  for (const match of skillMatches) {
    const block = match[0];
    const slug = match[1];
    const name = match[2];

    const sourceUrlMatch = block.match(/source_url:\s*["']([^"']+)["']/);
    const skillUrlMatch = block.match(/skill_url:\s*["']([^"']+)["']/);
    const categoryMatch = block.match(/category:\s*["']([^"']+)["']/);
    const subcategoryMatch = block.match(/subcategory:\s*["']([^"']+)["']/);
    const descMatch = block.match(/description:\s*["']([^"']+)["']/);
    const hasBody = block.includes("body:");

    entries.push({
      slug,
      name,
      source_url: sourceUrlMatch?.[1],
      skill_url: skillUrlMatch?.[1],
      category: categoryMatch?.[1] || "experimental",
      subcategory: subcategoryMatch?.[1],
      description: descMatch?.[1],
      hasBody,
    });
  }

  return entries;
}

export function loadExistingRegistry(): ExistingRegistry {
  const srcDataPath = path.join(process.cwd(), "src", "data");

  const files = fs.readdirSync(srcDataPath).filter(
    (f) => f.endsWith(".ts") && (f.includes("skills") || f === "skills.ts")
  );

  const bySlug = new Map<string, ExistingSkillEntry>();
  const byRepo = new Map<string, ExistingSkillEntry[]>();
  const bySkillUrl = new Map<string, ExistingSkillEntry>();
  const all: ExistingSkillEntry[] = [];

  for (const file of files) {
    const filePath = path.join(srcDataPath, file);
    const entries = parseSkillsFromFile(filePath);

    for (const entry of entries) {
      all.push(entry);
      bySlug.set(entry.slug, entry);

      if (entry.skill_url) {
        bySkillUrl.set(entry.skill_url, entry);
      }

      const repoKey = extractRepoKey(entry.source_url);
      if (repoKey) {
        const existing = byRepo.get(repoKey) || [];
        existing.push(entry);
        byRepo.set(repoKey, existing);
      }
    }
  }

  console.log(`[LoadExisting] Loaded ${all.length} existing skills from ${files.length} files`);
  console.log(`[LoadExisting] Unique slugs: ${bySlug.size}, Unique repos: ${byRepo.size}, Unique skill URLs: ${bySkillUrl.size}`);

  return { bySlug, byRepo, bySkillUrl, all };
}

export function hasSlug(registry: ExistingRegistry, slug: string): boolean {
  return registry.bySlug.has(slug);
}

export function findByRepo(registry: ExistingRegistry, repoUrl: string): ExistingSkillEntry[] {
  const repoKey = extractRepoKey(repoUrl);
  if (!repoKey) return [];
  return registry.byRepo.get(repoKey) || [];
}

export function findBySkillUrl(registry: ExistingRegistry, skillUrl: string): ExistingSkillEntry | undefined {
  return registry.bySkillUrl.get(skillUrl);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const registry = loadExistingRegistry();
  console.log(`\n[LoadExisting] Sample entries:`);
  registry.all.slice(0, 5).forEach((e) => {
    console.log(`  - ${e.slug}: ${e.name} (${e.category})`);
  });
}
