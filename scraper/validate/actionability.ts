export interface ActionabilityScore {
  score: number;
  breakdown: {
    hasSetup: boolean;
    hasInstall: boolean;
    hasUsage: boolean;
    hasExamples: boolean;
    hasInputOutput: boolean;
    hasConfiguration: boolean;
  };
}

const SETUP_PATTERNS = [
  /##?\s*(setup|getting started|quick start)/i,
  /##?\s*prerequisites/i,
  /##?\s*requirements/i,
];

const INSTALL_PATTERNS = [
  /##?\s*install(ation)?/i,
  /npm install/i,
  /pip install/i,
  /yarn add/i,
  /pnpm add/i,
  /cargo add/i,
  /go get/i,
];

const USAGE_PATTERNS = [
  /##?\s*usage/i,
  /##?\s*how to use/i,
  /##?\s*basic usage/i,
  /##?\s*api/i,
];

const EXAMPLE_PATTERNS = [
  /##?\s*examples?/i,
  /```[\w]*\n[\s\S]*?```/,
  /##?\s*demo/i,
];

const INPUT_OUTPUT_PATTERNS = [
  /##?\s*(input|output|parameters|arguments|returns)/i,
  /\|\s*param(eter)?\s*\|/i,
  /@param\s/,
  /\*\s*@/,
];

const CONFIG_PATTERNS = [
  /##?\s*config(uration)?/i,
  /##?\s*options/i,
  /##?\s*settings/i,
  /\.env/i,
  /environment variables/i,
];

function matchesAny(content: string, patterns: RegExp[]): boolean {
  return patterns.some((p) => p.test(content));
}

export function scoreActionability(content: string): ActionabilityScore {
  const hasSetup = matchesAny(content, SETUP_PATTERNS);
  const hasInstall = matchesAny(content, INSTALL_PATTERNS);
  const hasUsage = matchesAny(content, USAGE_PATTERNS);
  const hasExamples = matchesAny(content, EXAMPLE_PATTERNS);
  const hasInputOutput = matchesAny(content, INPUT_OUTPUT_PATTERNS);
  const hasConfiguration = matchesAny(content, CONFIG_PATTERNS);

  const weights = {
    hasSetup: 0.15,
    hasInstall: 0.2,
    hasUsage: 0.25,
    hasExamples: 0.2,
    hasInputOutput: 0.1,
    hasConfiguration: 0.1,
  };

  let score = 0;
  if (hasSetup) score += weights.hasSetup;
  if (hasInstall) score += weights.hasInstall;
  if (hasUsage) score += weights.hasUsage;
  if (hasExamples) score += weights.hasExamples;
  if (hasInputOutput) score += weights.hasInputOutput;
  if (hasConfiguration) score += weights.hasConfiguration;

  return {
    score,
    breakdown: {
      hasSetup,
      hasInstall,
      hasUsage,
      hasExamples,
      hasInputOutput,
      hasConfiguration,
    },
  };
}

export function isActionable(content: string, threshold = 0.4): boolean {
  const result = scoreActionability(content);
  return result.score >= threshold;
}
