import type { CategorizedSkillRecord } from "./lib/types.js";

const COMMON_STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
  "of", "with", "by", "from", "as", "is", "was", "are", "were", "been",
  "be", "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "must", "shall", "can", "this", "that", "these",
  "those", "it", "its", "they", "them", "their", "we", "us", "our", "you",
  "your", "he", "she", "him", "her", "his", "who", "which", "what", "when",
  "where", "why", "how", "all", "each", "every", "both", "few", "more",
  "most", "other", "some", "such", "no", "not", "only", "own", "same",
  "so", "than", "too", "very", "just", "also", "now", "here", "there",
]);

interface FrontmatterData {
  title?: string;
  tags?: string[];
  keywords?: string[];
  categories?: string[];
}

export function parseFrontmatter(content: string): FrontmatterData {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return {};

  const yaml = frontmatterMatch[1];
  const result: FrontmatterData = {};

  const titleMatch = yaml.match(/^title:\s*["']?(.+?)["']?\s*$/m);
  if (titleMatch) result.title = titleMatch[1];

  const tagsMatch = yaml.match(/^tags:\s*\[([^\]]*)\]/m);
  if (tagsMatch) {
    result.tags = tagsMatch[1]
      .split(",")
      .map((t) => t.trim().replace(/["']/g, ""))
      .filter(Boolean);
  }

  const keywordsMatch = yaml.match(/^keywords:\s*\[([^\]]*)\]/m);
  if (keywordsMatch) {
    result.keywords = keywordsMatch[1]
      .split(",")
      .map((t) => t.trim().replace(/["']/g, ""))
      .filter(Boolean);
  }

  return result;
}

export function extractKeywords(text: string, limit = 20): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !COMMON_STOPWORDS.has(w));

  const frequency: Record<string, number> = {};
  for (const word of words) {
    frequency[word] = (frequency[word] || 0) + 1;
  }

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word);
}

export function mergeTags(
  clawhubTags: string[],
  frontmatterTags: string[],
  extractedKeywords: string[]
): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  const addTag = (tag: string) => {
    const normalized = tag.toLowerCase().trim();
    if (normalized && !seen.has(normalized)) {
      seen.add(normalized);
      result.push(normalized);
    }
  };

  clawhubTags.forEach(addTag);
  frontmatterTags.forEach(addTag);
  extractedKeywords.slice(0, 10).forEach(addTag);

  return result.slice(0, 30);
}

export function extractAllTags(record: CategorizedSkillRecord): string[] {
  const clawhubTags = record.tags || [];

  let frontmatterTags: string[] = [];
  if (record.skill_content) {
    const fm = parseFrontmatter(record.skill_content);
    frontmatterTags = [...(fm.tags || []), ...(fm.keywords || [])];
  }

  const textForKeywords = [
    record.name,
    record.description,
    record.skill_content?.slice(0, 1000) || "",
  ].join(" ");

  const extractedKeywords = extractKeywords(textForKeywords);

  return mergeTags(clawhubTags, frontmatterTags, extractedKeywords);
}

export function enrichRecordWithTags(
  record: CategorizedSkillRecord
): CategorizedSkillRecord {
  const extractedTags = extractAllTags(record);
  return {
    ...record,
    extracted_tags: extractedTags,
  };
}
