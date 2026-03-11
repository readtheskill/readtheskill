import type { ResolvedSkillRecord, ValidatedSkillRecord } from "../lib/types.js";
import { fetchSkillForRecord } from "./fetch-skill.js";
import { validateStructure } from "./structural.js";
import { scoreActionability } from "./actionability.js";
import { computeContentHash } from "./hasher.js";
import { readProcessedData, writeProcessedData } from "../lib/fs-utils.js";
import { RateLimiter } from "../lib/rate-limiter.js";

export type Tier = "indexed" | "validated" | "verified";

export interface TierAssignment {
  tier: Tier;
  reason: string;
}

export function assignTier(
  structuralValid: boolean,
  actionabilityScore: number,
  urlConfidence: number
): TierAssignment {
  if (structuralValid && actionabilityScore >= 0.6 && urlConfidence >= 0.8) {
    return { tier: "verified", reason: "Passes all quality checks" };
  }

  if (structuralValid && actionabilityScore >= 0.3) {
    return { tier: "validated", reason: "Structurally valid with some actionable content" };
  }

  return { tier: "indexed", reason: "Basic entry, needs manual review" };
}

export async function validateRecord(
  record: ResolvedSkillRecord
): Promise<ValidatedSkillRecord> {
  const fetchResult = await fetchSkillForRecord(record);

  if (fetchResult.error || !fetchResult.content) {
    return {
      ...record,
      skill_content: undefined,
      content_hash: undefined,
      structural_valid: false,
      structural_errors: [fetchResult.error || "No content"],
      actionability_score: 0,
      tier: "indexed",
      validation_error: fetchResult.error ?? undefined,
    };
  }

  const content = fetchResult.content;
  const structural = validateStructure(content);
  const actionability = scoreActionability(content);
  const contentHash = computeContentHash(content);
  const tierAssignment = assignTier(
    structural.valid,
    actionability.score,
    record.skill_url_confidence
  );

  return {
    ...record,
    skill_content: content,
    content_hash: contentHash,
    structural_valid: structural.valid,
    structural_errors: structural.errors,
    actionability_score: actionability.score,
    tier: tierAssignment.tier,
    validation_error: undefined,
  };
}

export async function validateAllRecords(
  records: ResolvedSkillRecord[],
  options?: { onProgress?: (completed: number, total: number) => void }
): Promise<ValidatedSkillRecord[]> {
  const rateLimiter = new RateLimiter({ delayMs: 200, maxConcurrency: 5 });
  const validated: ValidatedSkillRecord[] = [];
  let completed = 0;

  console.log(`[Validate] Validating ${records.length} records...`);

  for (const record of records) {
    const result = await rateLimiter.execute(
      () => validateRecord(record),
      `validate:${record.slug}`
    );

    if (result.data) {
      validated.push(result.data);
    } else {
      validated.push({
        ...record,
        skill_content: undefined,
        content_hash: undefined,
        structural_valid: false,
        structural_errors: [result.error || "Validation failed"],
        actionability_score: 0,
        tier: "indexed",
        validation_error: result.error ?? undefined,
      });
    }

    completed++;
    options?.onProgress?.(completed, records.length);

    if (completed % 50 === 0) {
      console.log(`[Validate] Progress: ${completed}/${records.length}`);
    }
  }

  return validated;
}

export async function runValidation(): Promise<ValidatedSkillRecord[]> {
  const resolved = readProcessedData<ResolvedSkillRecord[]>("resolved-records.json");
  if (!resolved || resolved.length === 0) {
    throw new Error("No resolved records found. Run resolve first.");
  }

  const validated = await validateAllRecords(resolved);

  const withoutContent = validated.map(({ skill_content, ...rest }) => rest);
  writeProcessedData("validated-records.json", withoutContent);

  const byTier = validated.reduce(
    (acc, r) => {
      acc[r.tier] = (acc[r.tier] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  console.log(`[Validate] Tier distribution:`, byTier);
  console.log(`[Validate] Saved ${validated.length} validated records`);

  return validated;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runValidation()
    .then((records) => {
      console.log(`\n[Validate] Complete! Validated ${records.length} records.`);
    })
    .catch((err) => {
      console.error("[Validate] Failed:", err);
      process.exit(1);
    });
}
