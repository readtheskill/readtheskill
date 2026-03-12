import type { ResolvedSkillRecord } from "../lib/types.js";

export interface FetchResult {
  content: string | null;
  error: string | null;
  isHtml: boolean;
}

const FETCH_TIMEOUT = 15000;

export async function fetchSkillContent(url: string): Promise<FetchResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "text/plain, text/markdown, */*",
        "User-Agent": "readtheskill-scraper/1.0",
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        content: null,
        error: `HTTP ${response.status}: ${response.statusText}`,
        isHtml: false,
      };
    }

    const contentType = response.headers.get("content-type") || "";
    const content = await response.text();

    const isHtml =
      contentType.includes("text/html") ||
      content.trimStart().toLowerCase().startsWith("<!doctype") ||
      content.trimStart().toLowerCase().startsWith("<html");

    if (isHtml) {
      return {
        content: null,
        error: "Received HTML instead of markdown",
        isHtml: true,
      };
    }

    return {
      content,
      error: null,
      isHtml: false,
    };
  } catch (err) {
    clearTimeout(timeoutId);
    const message = err instanceof Error ? err.message : String(err);
    const isAborted = message.includes("aborted") || message.includes("timeout");
    return {
      content: null,
      error: isAborted ? "Request timeout" : message,
      isHtml: false,
    };
  }
}

export async function fetchSkillForRecord(
  record: ResolvedSkillRecord
): Promise<{ content: string | null; error: string | null }> {
  if (!record.skill_url) {
    return { content: null, error: "No skill URL to fetch" };
  }

  if (record.skill_url_confidence < 0.3) {
    return { content: null, error: "Skill URL confidence too low" };
  }

  const result = await fetchSkillContent(record.skill_url);
  return { content: result.content, error: result.error };
}
