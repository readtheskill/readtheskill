export interface StructuralValidation {
  valid: boolean;
  errors: string[];
  metrics: {
    length: number;
    headerCount: number;
    codeBlockCount: number;
    linkCount: number;
    listCount: number;
  };
}

const MIN_CONTENT_LENGTH = 200;
const MIN_HEADER_COUNT = 1;
const PLACEHOLDER_PATTERNS = [
  /^#\s*placeholder/i,
  /^#\s*todo/i,
  /\[insert.*here\]/i,
  /lorem ipsum/i,
  /^coming soon$/im,
  /^work in progress$/im,
  /^tbd$/im,
];

export function validateStructure(content: string): StructuralValidation {
  const errors: string[] = [];

  const length = content.length;
  if (length < MIN_CONTENT_LENGTH) {
    errors.push(`Content too short: ${length} chars (min ${MIN_CONTENT_LENGTH})`);
  }

  const headerMatches = content.match(/^#{1,6}\s+.+$/gm) || [];
  const headerCount = headerMatches.length;
  if (headerCount < MIN_HEADER_COUNT) {
    errors.push(`Not enough headers: ${headerCount} (min ${MIN_HEADER_COUNT})`);
  }

  const codeBlockMatches = content.match(/```[\s\S]*?```/g) || [];
  const codeBlockCount = codeBlockMatches.length;

  const linkMatches = content.match(/\[.+?\]\(.+?\)/g) || [];
  const linkCount = linkMatches.length;

  const listMatches = content.match(/^[\s]*[-*+]\s+.+$/gm) || [];
  const listCount = listMatches.length;

  for (const pattern of PLACEHOLDER_PATTERNS) {
    if (pattern.test(content)) {
      errors.push(`Content appears to be a placeholder`);
      break;
    }
  }

  if (content.trim().split("\n").length < 5) {
    errors.push("Content has too few lines");
  }

  return {
    valid: errors.length === 0,
    errors,
    metrics: {
      length,
      headerCount,
      codeBlockCount,
      linkCount,
      listCount,
    },
  };
}

export function isWellStructured(content: string): boolean {
  const validation = validateStructure(content);
  return validation.valid;
}
