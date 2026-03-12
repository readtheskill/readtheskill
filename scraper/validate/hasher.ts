import { createHash } from "crypto";

export function hashContent(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}

export function normalizeForHashing(content: string): string {
  return content
    .replace(/\r\n/g, "\n")
    .replace(/\s+$/gm, "")
    .trim();
}

export function computeContentHash(content: string): string {
  const normalized = normalizeForHashing(content);
  return hashContent(normalized);
}

export function contentChanged(oldHash: string, newContent: string): boolean {
  const newHash = computeContentHash(newContent);
  return oldHash !== newHash;
}
