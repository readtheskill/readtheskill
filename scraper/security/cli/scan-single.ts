import { readFileSync } from "fs";
import { basename } from "path";
import { scanSkillContent } from "../scanner";

const args = process.argv.slice(2);
const skillPath = args.find((a) => !a.startsWith("--")) || args[1];

if (!skillPath) {
  console.error("Usage: npm run security:scan -- path/to/SKILL.md");
  process.exit(1);
}

try {
  const content = readFileSync(skillPath, "utf-8");
  const slug = basename(skillPath, ".md").toLowerCase().replace(/skill\.?/gi, "").trim() || "unknown";

  console.log(`\nScanning: ${skillPath}`);
  console.log("─".repeat(60));

  const result = scanSkillContent(slug, content);

  console.log(`\nScore: ${result.score}/100`);
  console.log(`Badge: ${result.badge.toUpperCase()}`);
  console.log(`\nSummary:`);
  console.log(`  Total findings: ${result.summary.total_findings}`);
  console.log(`  Critical: ${result.summary.critical}`);
  console.log(`  High: ${result.summary.high}`);
  console.log(`  Medium: ${result.summary.medium}`);
  console.log(`  Low: ${result.summary.low}`);
  console.log(`  In code fences: ${result.summary.in_code_fence}`);

  if (result.findings.length > 0) {
    console.log(`\nFindings:`);
    for (const finding of result.findings) {
      const context = finding.in_code_fence ? " [code fence]" : finding.in_blockquote ? " [blockquote]" : "";
      console.log(
        `  Line ${finding.line_number}: [${finding.severity.toUpperCase()}] ${finding.rule_id} - ${finding.description}${context}`
      );
      console.log(`    Match: "${finding.matched_text.substring(0, 80)}${finding.matched_text.length > 80 ? "..." : ""}"`);
      console.log(`    Penalty: -${finding.penalty_applied} points`);
    }
  }

  console.log("\n" + "─".repeat(60));
  process.exit(result.badge === "fail" ? 1 : 0);
} catch (error) {
  console.error(`Error reading file: ${error}`);
  process.exit(1);
}
