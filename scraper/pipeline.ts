import { runDiscovery } from "./discovery/clawhub-search.js";
import { fetchAllDetails } from "./discovery/clawhub-detail.js";
import { normalizeRecords } from "./discovery/normalize.js";
import { resolveAllSkillUrls } from "./github/resolve-skill-url.js";
import { validateAllRecords } from "./validate/tier.js";
import { categorizeAllRecords } from "./categorizer.js";
import { enrichRecordWithTags } from "./categorizer-tags.js";
import { scanSkillContent } from "./security/scanner.js";
import { loadExistingRegistry } from "./deduplicator/load-existing.js";
import { processAllRecords } from "./deduplicator/conflict.js";
import { generateBatchFile } from "./output/generate-batch.js";
import { generateEnrichments } from "./output/generate-enrichments.js";
import { generateReport } from "./output/report.js";
import { writeProcessedData, writeRawSnapshot } from "./lib/fs-utils.js";
import {
  loadSyncState,
  saveSyncState,
  updateSlugHash,
  markRunComplete,
  type SyncState,
} from "./state/sync-state.js";
import { hashContent } from "./validate/hasher.js";
import type { PipelineStats, ProcessedSkillRecord, CategorizedSkillRecord, SecurityScanRecord } from "./lib/types.js";

/**
 * Run security scan on categorized records
 */
function securityScanRecords(records: CategorizedSkillRecord[]): SecurityScanRecord[] {
  const results: SecurityScanRecord[] = [];

  for (let i = 0; i < records.length; i++) {
    const record = records[i];

    // Build content to scan: prefer skill_content, fallback to description
    const content = record.skill_content || record.description || `# ${record.name}\n\n${record.description || ""}`;

    // Run security scan
    const scanResult = scanSkillContent(record.slug, content);

    results.push({
      ...record,
      security_score: scanResult.score,
      security_badge: scanResult.badge,
      security_findings_count: scanResult.summary.total_findings,
      security_critical_count: scanResult.summary.critical,
    });

    // Progress every 500 records
    if ((i + 1) % 500 === 0) {
      console.log(`[Security] Progress: ${i + 1}/${records.length}`);
    }
  }

  return results;
}

interface PipelineOptions {
  limit?: number;
  skipDiscovery?: boolean;
  skipResolve?: boolean;
  skipValidate?: boolean;
  skipSecurity?: boolean;
  incremental?: boolean;
}

export async function runPipeline(options: PipelineOptions = {}): Promise<{
  records: ProcessedSkillRecord[];
  stats: PipelineStats;
  syncState?: SyncState;
}> {
  const stats: PipelineStats = {
    discovered: 0,
    resolved: 0,
    validated: 0,
    categorized: 0,
    security_scanned: 0,
    security_passed: 0,
    security_failed: 0,
    new_skills: 0,
    enriched_skills: 0,
    skipped_skills: 0,
    by_category: {},
    by_tier: {},
    by_security_badge: {},
    errors: [],
  };

  const syncState = options.incremental ? loadSyncState() : undefined;
  const mode = options.incremental ? "INCREMENTAL" : "FULL";

  console.log("\n========================================");
  console.log(`  ClawHub Ingestion Pipeline (${mode})`);
  console.log("========================================\n");

  if (options.incremental && syncState) {
    console.log(`[Pipeline] Last sync: ${syncState.last_run_at || "never"}`);
    console.log(`[Pipeline] Known slugs: ${Object.keys(syncState.known_slugs).length}\n`);
  }

  console.log("[Pipeline] Phase 1: Discovery...");
  const { slugs } = await runDiscovery({ limit: options.limit, incremental: options.incremental });
  stats.discovered = slugs.length;

  if (options.incremental && slugs.length === 0) {
    console.log("[Pipeline] No new skills found. Exiting early.\n");
    if (syncState) {
      markRunComplete(syncState);
      saveSyncState(syncState);
    }
    return { records: [], stats, syncState };
  }

  console.log(`[Pipeline] Discovered ${slugs.length} ${options.incremental ? "new" : "unique"} slugs\n`);

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

  console.log("[Pipeline] Phase 4b: Security scanning...");
  const scanned: SecurityScanRecord[] = options.skipSecurity
    ? enriched.map((r) => ({
        ...r,
        security_score: 100,
        security_badge: "pass" as const,
        security_findings_count: 0,
        security_critical_count: 0,
      }))
    : securityScanRecords(enriched);
  stats.security_scanned = scanned.length;
  stats.security_passed = scanned.filter((r) => r.security_badge === "pass" || r.security_badge === "warn").length;
  stats.security_failed = scanned.filter((r) => r.security_badge === "fail").length;
  stats.by_security_badge = scanned.reduce(
    (acc, r) => {
      acc[r.security_badge] = (acc[r.security_badge] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  writeProcessedData("security-scanned-records.json", scanned);
  console.log(`[Pipeline] Security scanned: ${stats.security_scanned} (${stats.security_passed} passed, ${stats.security_failed} failed)\n`);

  // Filter out skills that fail security checks
  const securityFiltered = scanned.filter((r) => r.security_badge !== "fail");
  console.log(`[Pipeline] Filtered out ${scanned.length - securityFiltered.length} skills that failed security checks\n`);

  console.log("[Pipeline] Phase 5: Deduplicating...");
  const registry = loadExistingRegistry();
  const processed = processAllRecords(securityFiltered, registry);
  stats.new_skills = processed.filter((r) => r.dedupe.action === "new").length;
  stats.enriched_skills = processed.filter((r) => r.dedupe.action === "enrich").length;
  stats.skipped_skills = processed.filter((r) => r.dedupe.action === "skip").length;
  writeProcessedData("processed-records.json", processed);
  console.log(`[Pipeline] New: ${stats.new_skills}, Enrich: ${stats.enriched_skills}, Skip: ${stats.skipped_skills}\n`);

  console.log("[Pipeline] Phase 6: Generating outputs...");
  await generateBatchFile(processed);
  await generateEnrichments(processed);
  await generateReport(stats, processed);

  if (options.incremental && syncState) {
    console.log("[Pipeline] Updating sync state...");
    for (const record of processed) {
      if (record.dedupe.action === "new" || record.dedupe.action === "enrich") {
        const content = record.skill_content || record.description || "";
        const hash = hashContent(content);
        updateSlugHash(syncState, record.slug, hash);
      }
    }
    markRunComplete(syncState);
    saveSyncState(syncState);
  }

  console.log("\n========================================");
  console.log("  Pipeline Complete!");
  console.log("========================================");
  console.log(`  Total discovered: ${stats.discovered}`);
  console.log(`  With SKILL.md:    ${stats.resolved}`);
  console.log(`  Valid content:    ${stats.validated}`);
  console.log(`  Security scanned: ${stats.security_scanned}`);
  console.log(`  Security passed:  ${stats.security_passed}`);
  console.log(`  Security failed:  ${stats.security_failed}`);
  console.log(`  New skills:       ${stats.new_skills}`);
  console.log(`  Enrichments:      ${stats.enriched_skills}`);
  console.log(`  Skipped (dupes):  ${stats.skipped_skills}`);
  console.log("========================================\n");

  return { records: processed, stats, syncState };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const limitArg = args.find((a) => a.startsWith("--limit="));
  const limit = limitArg ? parseInt(limitArg.split("=")[1], 10) : undefined;
  const skipResolve = args.includes("--skip-resolve");
  const skipValidate = args.includes("--skip-validate");
  const skipSecurity = args.includes("--skip-security");
  const incremental = args.includes("--incremental");

  runPipeline({ limit, skipResolve, skipValidate, skipSecurity, incremental })
    .then(({ stats, syncState }) => {
      console.log("[Pipeline] Final stats:", JSON.stringify(stats, null, 2));
      if (incremental && syncState) {
        console.log(`[Pipeline] Sync state updated: ${syncState.total_synced} total known slugs`);
      }
    })
    .catch((err) => {
      console.error("[Pipeline] Failed:", err);
      process.exit(1);
    });
}
