export function normalizeFrameworkLabel(framework: string): string {
  if (!framework) return framework;
  return framework.replace(/\bSolana Agent Kit\b/g, "SendAI Solana Toolkit");
}
