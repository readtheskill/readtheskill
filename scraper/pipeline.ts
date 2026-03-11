import { runDiscovery } from "./discovery/clawhub-search.js";
import { fetchAllDetails } from "./discovery/clawhub-detail.js";
import { normalizeRecords } from "./discovery/normalize.js";
import { resolveAllSkillUrls } from "./github/resolve-skill-url.js";
import { validateAllRecords } from "./validate/tier.js";
import { categorizeAllRecords } from "./categorizer.js";
import { enrichRecordWithTags } from "./categorizer-tags.js";
import { loadExistingRegistry } from "./deduplicator/load-existing.js";
import { processAllRecords } from "./deduplicator/conflict.js";
import { generateBatchFile } from "./output/generate-batch.js";
import { generateEnrichments } from "./output/generate-enrichments.js";
import { generateReport } from "./output/report.js";
import { writeProcessedData, writeRawSnapshot } from "./lib/fs-utils.js";
import type { PipelineStats, ProcessedSkillRecord } from "./lib/types.js";

interface PipelineOptions {
  limit?: number;
  skipDiscovery?: boolean;
  skipResolve?: boolean;
  skipValidate?: boolean;
}

export async function runPipeline(options: PipelineOptions = {}): Promise<{
  records: ProcessedSkillRecord[];
  stats: PipelineStats;
}> {
  const stats: PipelineStats = {
    discovered: 0,
    resolved: 0,
    validated: 0,
    categorized: 0,
    new_skills: 0,
    enriched_skills: 0,
    skipped_skills: 0,
    by_category: {},
    by_tier: {},
    errors: [],
  };

  console.log("\n========================================");
  console.log("  ClawHub Ingestion Pipeline");
  console.log("========================================\n");

  console.log("[Pipeline] Phase 1: Discovery...");
  const { slugs } = await runDiscovery({ limit: options.limit });
  stats.discovered = slugs.length;
  console.log(`[Pipeline] Discovered ${slugs.length} unique slugs\n`);

  console.log("[Pipeline] Phase 1b: Fetching details...");
  const rawRecords = await fetchAllDetails(slugs);
  writeRawSnapshot("raw-records.json", rawRecords);
  console.log(`[Pipeline] Fetched ${rawRecords.length} skill details\n`);

  console.log("[Pipeline] Phase 1c: Normalizing records...");
  const normalized = normalizeRecords(rawRecords);
  writeProcessedData("normalized-records.json", normalized);
  console.log(`[Pipeline] Normalized ${normalized.length} records\n`);

  console.log("[Pipeline] Phase 2: Resolving GitHub SKILL.md URLs...");
  const resolved = options.skipResolve
    ? normalized.map((r) => ({ ...r, skill_url: undefined, skill_url_method: undefined, skill_url_confidence: 0, resolution_error: "Skipped" }))
    : await resolveAllSkillUrls(normalized);
  stats.resolved = resolved.filter((r) => r.skill_url && r.skill_url_confidence > 0.5).length;
  writeProcessedData("resolved-records.json", resolved);
  console.log(`[Pipeline] Resolved ${stats.resolved} SKILL.md URLs\n`);

  console.log("[Pipeline] Phase 3: Validating content...");
  const validated = options.skipValidate
    ? resolved.map((r) => ({
        ...r,
        structural_valid: false,
        actionability_score: 0,
        tier: "indexed" as const,
      }))
    : await validateAllRecords(resolved);
  stats.validated = validated.filter((r) => r.structural_valid).length;
  stats.by_tier = validated.reduce(
    (acc, r) => {
      acc[r.tier] = (acc[r.tier] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  writeProcessedData("validated-records.json", validated);
  console.log(`[Pipeline] Validated ${stats.validated} records\n`);

  console.log("[Pipeline] Phase 4: Categorizing...");
  const categorized = categorizeAllRecords(validated);
  const enriched = categorized.map(enrichRecordWithTags);
  stats.categorized = enriched.length;
  stats.by_category = enriched.reduce(
    (acc, r) => {
      acc[r.category] = (acc[r.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  writeProcessedData("categorized-records.json", enriched);
  console.log(`[Pipeline] Categorized ${stats.categorized} records\n`);

  console.log("[Pipeline] Phase 5: Deduplicating...");
  const registry = loadExistingRegistry();
  const processed = processAllRecords(enriched, registry);
  stats.new_skills = processed.filter((r) => r.dedupe.action === "new").length;
  stats.enriched_skills = processed.filter((r) => r.dedupe.action === "enrich").length;
  stats.skipped_skills = processed.filter((r) => r.dedupe.action === "skip").length;
  writeProcessedData("processed-records.json", processed);
  console.log(`[Pipeline] New: ${stats.new_skills}, Enrich: ${stats.enriched_skills}, Skip: ${stats.skipped_skills}\n`);

  console.log("[Pipeline] Phase 6: Generating outputs...");
  await generateBatchFile(processed);
  await generateEnrichments(processed);
  await generateReport(stats, processed);

  console.log("\n========================================");
  console.log("  Pipeline Complete!");
  console.log("========================================");
  console.log(`  Total discovered: ${stats.discovered}`);
  console.log(`  With SKILL.md:    ${stats.resolved}`);
  console.log(`  Valid content:    ${stats.validated}`);
  console.log(`  New skills:       ${stats.new_skills}`);
  console.log(`  Enrichments:      ${stats.enriched_skills}`);
  console.log(`  Skipped (dupes):  ${stats.skipped_skills}`);
  console.log("========================================\n");

  return { records: processed, stats };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const limitArg = args.find((a) => a.startsWith("--limit="));
  const limit = limitArg ? parseInt(limitArg.split("=")[1], 10) : undefined;
  const skipResolve = args.includes("--skip-resolve");
  const skipValidate = args.includes("--skip-validate");

  runPipeline({ limit, skipResolve, skipValidate })
    .then(({ stats }) => {
      console.log("[Pipeline] Final stats:", JSON.stringify(stats, null, 2));
    })
    .catch((err) => {
      console.error("[Pipeline] Failed:", err);
      process.exit(1);
    });
}
