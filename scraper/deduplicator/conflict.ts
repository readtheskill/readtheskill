import type { CategorizedSkillRecord, ProcessedSkillRecord, DedupeResult } from "../lib/types.js";
import type { ExistingSkillEntry, ExistingRegistry } from "./load-existing.js";
import type { MatchResult } from "./match.js";
import { loadExistingRegistry } from "./load-existing.js";
import { findMatch, matchAllRecords } from "./match.js";
import { readProcessedData, writeProcessedData } from "../lib/fs-utils.js";

export interface RichnessScore {
  total: number;
  breakdown: {
    hasDescription: boolean;
    hasSkillUrl: boolean;
    hasBody: boolean;
    hasTags: boolean;
    hasSubcategory: boolean;
    contentLength: number;
  };
}

function scoreRichnessExisting(entry: ExistingSkillEntry): RichnessScore {
  const hasDescription = Boolean(entry.description && entry.description.length > 20);
  const hasSkillUrl = Boolean(entry.skill_url);
  const hasBody = entry.hasBody;
  const hasTags = Boolean(entry.tags && entry.tags.length > 0);
  const hasSubcategory = Boolean(entry.subcategory);
  const contentLength = (entry.description?.length || 0);

  const total =
    (hasDescription ? 2 : 0) +
    (hasSkillUrl ? 3 : 0) +
    (hasBody ? 4 : 0) +
    (hasTags ? 1 : 0) +
    (hasSubcategory ? 1 : 0) +
    Math.min(contentLength / 100, 2);

  return {
    total,
    breakdown: {
      hasDescription,
      hasSkillUrl,
      hasBody,
      hasTags,
      hasSubcategory,
      contentLength,
    },
  };
}

function scoreRichnessNew(record: CategorizedSkillRecord): RichnessScore {
  const hasDescription = Boolean(record.description && record.description.length > 20);
  const hasSkillUrl = Boolean(record.skill_url && record.skill_url_confidence > 0.5);
  const hasBody = Boolean(record.skill_content && record.skill_content.length > 200);
  const hasTags = Boolean(record.extracted_tags && record.extracted_tags.length > 0);
  const hasSubcategory = Boolean(record.subcategory);
  const contentLength = (record.description?.length || 0) + (record.skill_content?.length || 0);

  const total =
    (hasDescription ? 2 : 0) +
    (hasSkillUrl ? 3 : 0) +
    (hasBody ? 4 : 0) +
    (hasTags ? 1 : 0) +
    (hasSubcategory ? 1 : 0) +
    Math.min(contentLength / 100, 2);

  return {
    total,
    breakdown: {
      hasDescription,
      hasSkillUrl,
      hasBody,
      hasTags,
      hasSubcategory,
      contentLength,
    },
  };
}

export function resolveConflict(
  record: CategorizedSkillRecord,
  match: MatchResult
): DedupeResult {
  if (match.matchType === "none") {
    return { action: "new" };
  }

  const existing = match.existingEntry!;
  const existingScore = scoreRichnessExisting(existing);
  const newScore = scoreRichnessNew(record);

  if (newScore.total > existingScore.total + 2) {
    return {
      action: "enrich",
      existing_slug: existing.slug,
      reason: `New entry richer: ${newScore.total.toFixed(1)} vs ${existingScore.total.toFixed(1)}`,
    };
  }

  const newHasSkillUrl = newScore.breakdown.hasSkillUrl && !existingScore.breakdown.hasSkillUrl;
  if (newHasSkillUrl) {
    return {
      action: "enrich",
      existing_slug: existing.slug,
      reason: "New entry has skill_url, existing doesn't",
    };
  }

  return {
    action: "skip",
    existing_slug: existing.slug,
    reason: `Existing entry sufficient: ${existingScore.total.toFixed(1)} vs new ${newScore.total.toFixed(1)}`,
  };
}

export function processAllRecords(
  records: CategorizedSkillRecord[],
  registry: ExistingRegistry
): ProcessedSkillRecord[] {
  console.log(`[Dedupe] Processing ${records.length} records against ${registry.all.length} existing...`);

  const results: ProcessedSkillRecord[] = [];

  for (const record of records) {
    const match = findMatch(record, registry);
    const dedupe = resolveConflict(record, match);

    results.push({
      ...record,
      dedupe,
    });
  }

  const counts = results.reduce(
    (acc, r) => {
      acc[r.dedupe.action] = (acc[r.dedupe.action] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  console.log(`[Dedupe] Results: new=${counts.new || 0}, enrich=${counts.enrich || 0}, skip=${counts.skip || 0}`);

  return results;
}

export async function runDedupe(): Promise<ProcessedSkillRecord[]> {
  const categorized = readProcessedData<CategorizedSkillRecord[]>("categorized-records.json");
  if (!categorized || categorized.length === 0) {
    throw new Error("No categorized records found. Run categorize first.");
  }

  const registry = loadExistingRegistry();
  const processed = processAllRecords(categorized, registry);

  writeProcessedData("processed-records.json", processed);
  writeProcessedData(
    "new-skills.json",
    processed.filter((r) => r.dedupe.action === "new")
  );
  writeProcessedData(
    "enrich-skills.json",
    processed.filter((r) => r.dedupe.action === "enrich")
  );
  writeProcessedData(
    "skip-skills.json",
    processed.filter((r) => r.dedupe.action === "skip")
  );

  console.log(`[Dedupe] Saved processed records to processed-records.json`);

  return processed;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runDedupe()
    .then((records) => {
      console.log(`\n[Dedupe] Complete! Processed ${records.length} records.`);
    })
    .catch((err) => {
      console.error("[Dedupe] Failed:", err);
      process.exit(1);
    });
}
