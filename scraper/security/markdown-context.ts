import type { LineContext } from "./types";

/**
 * Parse markdown content to identify which lines are inside code fences or blockquotes.
 * This is critical for reducing false positives - code examples that demonstrate
 * dangerous patterns (like `eval()` or `curl | bash`) should get reduced penalties.
 */
export function getMarkdownContext(content: string): LineContext[] {
  const lines = content.split("\n");
  let inCodeFence = false;
  let codeBlockDepth = 0;

  return lines.map((line, index) => {
    const trimmed = line.trim();

    // Handle code fence toggles (``` or ~~~)
    if (trimmed.startsWith("```") || trimmed.startsWith("~~~")) {
      if (!inCodeFence) {
        inCodeFence = true;
        codeBlockDepth++;
      } else if (trimmed === "```" || trimmed === "~~~") {
        codeBlockDepth--;
        if (codeBlockDepth <= 0) {
          inCodeFence = false;
          codeBlockDepth = 0;
        }
      }
    }

    // Detect blockquotes (lines starting with >)
    const isBlockquote = trimmed.startsWith(">");

    return {
      lineNumber: index + 1,
      text: line,
      inCodeFence,
      inBlockquote: isBlockquote,
    };
  });
}

/**
 * Find which line a character offset falls on
 */
export function getLineNumberForOffset(
  content: string,
  offset: number
): number {
  const beforeMatch = content.substring(0, offset);
  return beforeMatch.split("\n").length;
}

/**
 * Get context for a specific line number
 */
export function getContextForLine(
  contexts: LineContext[],
  lineNumber: number
): LineContext | undefined {
  return contexts.find((ctx) => ctx.lineNumber === lineNumber);
}
