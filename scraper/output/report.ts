import * as fs from "fs";
import * as path from "path";
import type { PipelineStats, ProcessedSkillRecord } from "../lib/types.js";
import { readProcessedData } from "../lib/fs-utils.js";

const REPORT_PATH = path.join(process.cwd(), "scraper", "out", "processed", "pipeline-report.md");

export async function generateReport(
  stats: PipelineStats,
  records: ProcessedSkillRecord[]
): Promise<void> {
  const lines: string[] = [];

  lines.push("# ClawHub Ingestion Pipeline Report");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push("");

  lines.push("## Summary");
  lines.push("");
  lines.push("| Metric | Count |");
  lines.push("|--------|-------|");
  lines.push(`| Discovered slugs | ${stats.discovered} |`);
  lines.push(`| Resolved SKILL.md URLs | ${stats.resolved} |`);
  lines.push(`| Valid content | ${stats.validated} |`);
  lines.push(`| Categorized | ${stats.categorized} |`);
  lines.push(`| **New skills** | ${stats.new_skills} |`);
  lines.push(`| **Enrichments** | ${stats.enriched_skills} |`);
  lines.push(`| Skipped (duplicates) | ${stats.skipped_skills} |`);
  lines.push("");

  lines.push("## By Category");
  lines.push("");
  lines.push("| Category | Count |");
  lines.push("|----------|-------|");
  const sortedCategories = Object.entries(stats.by_category).sort((a, b) => b[1] - a[1]);
  for (const [cat, count] of sortedCategories) {
    lines.push(`| ${cat} | ${count} |`);
  }
  lines.push("");

  lines.push("## By Tier");
  lines.push("");
  lines.push("| Tier | Count |");
  lines.push("|------|-------|");
  for (const [tier, count] of Object.entries(stats.by_tier)) {
    lines.push(`| ${tier} | ${count} |`);
  }
  lines.push("");

  const newSkills = records.filter((r) => r.dedupe.action === "new");
  if (newSkills.length > 0) {
    lines.push("## Sample New Skills (first 20)");
    lines.push("");
    lines.push("| Slug | Name | Category | Tier |");
    lines.push("|------|------|----------|------|");
    for (const skill of newSkills.slice(0, 20)) {
      lines.push(`| ${skill.slug} | ${skill.name} | ${skill.category} | ${skill.tier} |`);
    }
    lines.push("");
  }

  const enrichSkills = records.filter((r) => r.dedupe.action === "enrich");
  if (enrichSkills.length > 0) {
    lines.push("## Sample Enrichments (first 10)");
    lines.push("");
    lines.push("| Existing Slug | New Data From | Reason |");
    lines.push("|---------------|---------------|--------|");
    for (const skill of enrichSkills.slice(0, 10)) {
      lines.push(`| ${skill.dedupe.existing_slug} | ${skill.slug} | ${skill.dedupe.reason || "-"} |`);
    }
    lines.push("");
  }

  if (stats.errors.length > 0) {
    lines.push("## Errors");
    lines.push("");
    for (const error of stats.errors.slice(0, 20)) {
      lines.push(`- ${error}`);
    }
    lines.push("");
  }

  lines.push("## Output Files");
  lines.push("");
  lines.push("- `src/data/skills-batch-clawhub.ts` - New skills ready to import");
  lines.push("- `scraper/out/processed/enrichments.json` - Enrichment data");
  lines.push("- `scraper/out/processed/processed-records.json` - Full processed data");
  lines.push("- `scraper/out/raw/` - Raw API responses");
  lines.push("");

  const content = lines.join("\n");
  fs.writeFileSync(REPORT_PATH, content);

  console.log(`[Report] Generated report at ${REPORT_PATH}`);
}

export async function printQuickStats(): Promise<void> {
  const processed = readProcessedData<ProcessedSkillRecord[]>("processed-records.json");
  if (!processed) {
    console.log("No processed records found");
    return;
  }

  const newCount = processed.filter((r) => r.dedupe.action === "new").length;
  const enrichCount = processed.filter((r) => r.dedupe.action === "enrich").length;
  const skipCount = processed.filter((r) => r.dedupe.action === "skip").length;

  console.log("\n=== Quick Stats ===");
  console.log(`Total processed: ${processed.length}`);
  console.log(`New skills:      ${newCount}`);
  console.log(`Enrichments:     ${enrichCount}`);
  console.log(`Skipped:         ${skipCount}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  printQuickStats();
}
