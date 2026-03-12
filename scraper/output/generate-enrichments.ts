import * as fs from "fs";
import * as path from "path";
import type { ProcessedSkillRecord } from "../lib/types.js";
import { readProcessedData, writeProcessedData } from "../lib/fs-utils.js";

const OUTPUT_PATH = path.join(process.cwd(), "scraper", "out", "processed", "enrichments.json");

export interface Enrichment {
  existing_slug: string;
  updates: {
    skill_url?: string;
    subcategory?: string;
    description?: string;
    tags?: string[];
  };
  source_record: {
    slug: string;
    clawhub_url: string;
  };
  reason: string;
}

export async function generateEnrichments(
  records: ProcessedSkillRecord[]
): Promise<Enrichment[]> {
  const toEnrich = records.filter((r) => r.dedupe.action === "enrich");

  if (toEnrich.length === 0) {
    console.log("[GenerateEnrichments] No enrichments to generate");
    return [];
  }

  const enrichments: Enrichment[] = toEnrich.map((record) => ({
    existing_slug: record.dedupe.existing_slug!,
    updates: {
      skill_url: record.skill_url && record.skill_url_confidence >= 0.5 ? record.skill_url : undefined,
      subcategory: record.subcategory,
      tags: record.extracted_tags?.slice(0, 10),
    },
    source_record: {
      slug: record.slug,
      clawhub_url: record.clawhub_url,
    },
    reason: record.dedupe.reason || "Enrichment from ClawHub",
  }));

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(enrichments, null, 2));
  writeProcessedData("enrichments.json", enrichments);

  console.log(`[GenerateEnrichments] Wrote ${enrichments.length} enrichments to ${OUTPUT_PATH}`);

  return enrichments;
}

export function applyEnrichmentsManually(enrichments: Enrichment[]): string {
  const instructions: string[] = [
    "# Manual Enrichment Instructions",
    "",
    "Apply these updates to existing entries in src/data/skills.ts or batch files:",
    "",
  ];

  for (const e of enrichments) {
    instructions.push(`## ${e.existing_slug}`);
    instructions.push(`Reason: ${e.reason}`);
    instructions.push(`Source: ${e.source_record.clawhub_url}`);
    instructions.push("");

    if (e.updates.skill_url) {
      instructions.push(`Add skill_url: "${e.updates.skill_url}"`);
    }
    if (e.updates.subcategory) {
      instructions.push(`Add subcategory: "${e.updates.subcategory}"`);
    }
    if (e.updates.tags && e.updates.tags.length > 0) {
      instructions.push(`Add/merge tags: [${e.updates.tags.map((t) => `"${t}"`).join(", ")}]`);
    }
    instructions.push("");
  }

  return instructions.join("\n");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const processed = readProcessedData<ProcessedSkillRecord[]>("processed-records.json");
  if (!processed) {
    console.error("No processed records found");
    process.exit(1);
  }
  generateEnrichments(processed)
    .then((enrichments) => {
      if (enrichments.length > 0) {
        const instructions = applyEnrichmentsManually(enrichments);
        const instructionsPath = path.join(process.cwd(), "scraper", "out", "processed", "enrichment-instructions.md");
        fs.writeFileSync(instructionsPath, instructions);
        console.log(`Instructions written to ${instructionsPath}`);
      }
    })
    .catch((err) => {
      console.error("Failed:", err);
      process.exit(1);
    });
}
