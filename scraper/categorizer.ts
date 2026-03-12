import { CATEGORY_RULES, getCategoryRule } from "./config/category-rules.js";
import type { ValidatedSkillRecord, CategorizedSkillRecord } from "./lib/types.js";
import { readProcessedData, writeProcessedData } from "./lib/fs-utils.js";
import overrides from "./config/category-overrides.json" with { type: "json" };

interface CategoryScore {
  category: string;
  score: number;
  matchedKeywords: string[];
}

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, " ");
}

function scoreCategory(
  text: string,
  rule: (typeof CATEGORY_RULES)[0]
): CategoryScore {
  const normalizedText = normalizeText(text);
  const matchedKeywords: string[] = [];
  let score = 0;

  for (const keyword of rule.keywords) {
    const normalizedKeyword = normalizeText(keyword);
    if (normalizedText.includes(normalizedKeyword)) {
      matchedKeywords.push(keyword);
      const keywordWeight = keyword.includes(" ") ? 1.5 : 1.0;
      score += rule.weight * keywordWeight;
    }
  }

  return {
    category: rule.category,
    score,
    matchedKeywords,
  };
}

function detectSubcategory(
  text: string,
  category: string
): string | undefined {
  const rule = getCategoryRule(category);
  if (!rule?.subcategories) return undefined;

  let bestMatch: { subcategory: string; count: number } | undefined;
  const normalizedText = normalizeText(text);

  for (const [subcategory, keywords] of Object.entries(rule.subcategories)) {
    let matchCount = 0;
    for (const keyword of keywords) {
      if (normalizedText.includes(normalizeText(keyword))) {
        matchCount++;
      }
    }
    if (matchCount > 0 && (!bestMatch || matchCount > bestMatch.count)) {
      bestMatch = { subcategory, count: matchCount };
    }
  }

  return bestMatch?.subcategory;
}

export function categorize(record: ValidatedSkillRecord): {
  category: string;
  subcategory?: string;
  confidence: number;
} {
  const slugOverrides = overrides["slug-overrides"] as Record<string, { category: string; subcategory?: string }>;
  if (record.slug && slugOverrides[record.slug]) {
    const override = slugOverrides[record.slug];
    return {
      category: override.category,
      subcategory: override.subcategory,
      confidence: 1.0,
    };
  }

  const repoKey = record.repo_owner && record.repo_name
    ? `${record.repo_owner}/${record.repo_name}`
    : null;
  const repoOverrides = overrides["repo-overrides"] as Record<string, { category: string; subcategory?: string }>;
  if (repoKey && repoOverrides[repoKey]) {
    const override = repoOverrides[repoKey];
    return {
      category: override.category,
      subcategory: override.subcategory,
      confidence: 1.0,
    };
  }

  const textToAnalyze = [
    record.name,
    record.description,
    record.skill_content?.slice(0, 2000) || "",
    (record.tags || []).join(" "),
  ].join(" ");

  const scores: CategoryScore[] = CATEGORY_RULES.map((rule) =>
    scoreCategory(textToAnalyze, rule)
  );

  scores.sort((a, b) => b.score - a.score);

  if (scores[0].score === 0) {
    return {
      category: "experimental",
      subcategory: undefined,
      confidence: 0.1,
    };
  }

  const topScore = scores[0];
  const secondScore = scores[1]?.score || 0;
  const confidence = secondScore > 0
    ? Math.min(1, (topScore.score - secondScore) / topScore.score + 0.5)
    : Math.min(1, topScore.score / 5);

  const subcategory = detectSubcategory(textToAnalyze, topScore.category);

  return {
    category: topScore.category,
    subcategory,
    confidence,
  };
}

export function categorizeRecord(record: ValidatedSkillRecord): CategorizedSkillRecord {
  const result = categorize(record);
  return {
    ...record,
    category: result.category,
    subcategory: result.subcategory,
    category_confidence: result.confidence,
    extracted_tags: record.tags || [],
  };
}

export function categorizeAllRecords(
  records: ValidatedSkillRecord[]
): CategorizedSkillRecord[] {
  console.log(`[Categorize] Categorizing ${records.length} records...`);

  const categorized = records.map(categorizeRecord);

  const byCategory = categorized.reduce(
    (acc, r) => {
      acc[r.category] = (acc[r.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  console.log(`[Categorize] Distribution:`, byCategory);

  return categorized;
}

export async function runCategorize(): Promise<CategorizedSkillRecord[]> {
  const validated = readProcessedData<ValidatedSkillRecord[]>("validated-records.json");
  if (!validated || validated.length === 0) {
    throw new Error("No validated records found. Run validation first.");
  }

  const categorized = categorizeAllRecords(validated);

  writeProcessedData("categorized-records.json", categorized);
  console.log(`[Categorize] Saved ${categorized.length} categorized records`);

  return categorized;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runCategorize()
    .then((records) => {
      console.log(`\n[Categorize] Complete! Categorized ${records.length} records.`);
    })
    .catch((err) => {
      console.error("[Categorize] Failed:", err);
      process.exit(1);
    });
}
