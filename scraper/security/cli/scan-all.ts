import { writeFileSync, existsSync, mkdirSync, readFileSync } from "fs";
import { join } from "path";
import { scanSkillContent, generateBatchReport } from "../scanner";
import type { SecurityScanResult } from "../types";

const OUTPUT_DIR = join(process.cwd(), "scraper/out/security");
const RESULTS_PATH = join(OUTPUT_DIR, "scan-results.json");
const REPORT_PATH = join(OUTPUT_DIR, "security-report.md");

interface SkillEntry {
  slug: string;
  name: string;
  description?: string;
  body?: string;
  skill_url?: string;
}

async function fetchSkillContent(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "readtheskill-security-scanner/1.0" },
    });
    if (!response.ok) return null;
    const text = await response.text();
    if (text.includes("<!DOCTYPE") || text.includes("<html")) return null;
    return text;
  } catch {
    return null;
  }
}

async function loadSkillsFromRegistry(): Promise<SkillEntry[]> {
  // Dynamic import of the skills registry
  const skillsModule = await import("../../../src/data/skills");
  const SKILLS = skillsModule.SKILLS as SkillEntry[];
  return SKILLS;
}

async function main() {
  console.log("\n" + "═".repeat(60));
  console.log("  Security Scanner - Batch Scan All Skills");
  console.log("═".repeat(60) + "\n");

  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Load existing results if resuming
  let existingResults: Record<string, SecurityScanResult> = {};
  if (existsSync(RESULTS_PATH)) {
    try {
      const existing = JSON.parse(readFileSync(RESULTS_PATH, "utf-8"));
      if (Array.isArray(existing)) {
        existingResults = Object.fromEntries(existing.map((r: SecurityScanResult) => [r.skill_slug, r]));
      }
      console.log(`Loaded ${Object.keys(existingResults).length} existing scan results`);
    } catch {
      console.log("Starting fresh scan (no valid existing results)");
    }
  }

  // Load skills from registry
  console.log("Loading skills from registry...");
  const skills = await loadSkillsFromRegistry();
  console.log(`Found ${skills.length} skills\n`);

  const results: SecurityScanResult[] = [];
  let scanned = 0;
  let skipped = 0;
  let noContent = 0;
  let fetched = 0;

  for (let i = 0; i < skills.length; i++) {
    const skill = skills[i];
    const progress = `[${i + 1}/${skills.length}]`;

    // Skip if already scanned (use cached result)
    if (existingResults[skill.slug]) {
      results.push(existingResults[skill.slug]);
      skipped++;
      continue;
    }

    // Get content from body first
    let content = skill.body || "";

    // If no body, try fetching from URL
    if (!content && skill.skill_url) {
      content = await fetchSkillContent(skill.skill_url) || "";
      if (content) fetched++;
    }

    // Use description as fallback content
    if (!content || content.length < 20) {
      content = `# ${skill.name}\n\n${skill.description || ""}`;
    }

    if (content.length < 20) {
      noContent++;
      continue;
    }

    const result = scanSkillContent(skill.slug, content);
    results.push(result);
    scanned++;

    // Progress indicator
    const badge =
      result.badge === "pass" ? "🟢" :
      result.badge === "warn" ? "🟡" :
      result.badge === "review" ? "🟠" : "🔴";

    // Clear line and print progress
    process.stdout.write(`\r\x1b[K${progress} ${badge} ${skill.slug.substring(0, 40).padEnd(40)} Score: ${result.score.toString().padStart(3)}`);

    // Save intermediate results every 200 skills
    if (scanned % 200 === 0) {
      writeFileSync(RESULTS_PATH, JSON.stringify(results, null, 2));
      console.log(`\n  [Checkpoint saved: ${scanned} scanned]`);
    }
  }

  console.log("\n\nScan complete!");
  console.log(`  Scanned: ${scanned}`);
  console.log(`  Skipped (cached): ${skipped}`);
  console.log(`  Fetched from URL: ${fetched}`);
  console.log(`  No content: ${noContent}`);

  // Generate report
  const report = generateBatchReport(results);

  console.log("\n" + "─".repeat(60));
  console.log("Summary:");
  console.log(`  Total scanned: ${report.total_scanned}`);
  console.log(`  Average score: ${report.average_score}`);
  console.log(`  🟢 Pass: ${report.by_badge.pass} (${((report.by_badge.pass / report.total_scanned) * 100).toFixed(1)}%)`);
  console.log(`  🟡 Warn: ${report.by_badge.warn} (${((report.by_badge.warn / report.total_scanned) * 100).toFixed(1)}%)`);
  console.log(`  🟠 Review: ${report.by_badge.review} (${((report.by_badge.review / report.total_scanned) * 100).toFixed(1)}%)`);
  console.log(`  🔴 Fail: ${report.by_badge.fail} (${((report.by_badge.fail / report.total_scanned) * 100).toFixed(1)}%)`);
  console.log(`  Critical findings: ${report.critical_findings}`);
  console.log(`  Skills with critical issues: ${report.skills_with_critical.length}`);

  // Save results
  writeFileSync(RESULTS_PATH, JSON.stringify(results, null, 2));
  console.log(`\nResults saved to: ${RESULTS_PATH}`);

  // Generate markdown report
  const mdReport = generateMarkdownReport(report, results);
  writeFileSync(REPORT_PATH, mdReport);
  console.log(`Report saved to: ${REPORT_PATH}`);
}

function generateMarkdownReport(
  report: ReturnType<typeof generateBatchReport>,
  results: SecurityScanResult[]
): string {
  const failedSkills = results.filter((r) => r.badge === "fail");
  const reviewSkills = results.filter((r) => r.badge === "review");

  return `# Security Scan Report

Generated: ${new Date().toISOString()}

## Summary

| Metric | Value |
|--------|-------|
| Total Scanned | ${report.total_scanned} |
| Average Score | ${report.average_score}/100 |
| 🟢 Pass (90-100) | ${report.by_badge.pass} (${((report.by_badge.pass / report.total_scanned) * 100).toFixed(1)}%) |
| 🟡 Warn (70-89) | ${report.by_badge.warn} (${((report.by_badge.warn / report.total_scanned) * 100).toFixed(1)}%) |
| 🟠 Review (40-69) | ${report.by_badge.review} (${((report.by_badge.review / report.total_scanned) * 100).toFixed(1)}%) |
| 🔴 Fail (0-39) | ${report.by_badge.fail} (${((report.by_badge.fail / report.total_scanned) * 100).toFixed(1)}%) |
| Critical Findings | ${report.critical_findings} |

## Findings by Category

| Category | Count |
|----------|-------|
${Object.entries(report.by_category)
  .sort((a, b) => b[1] - a[1])
  .map(([cat, count]) => `| ${cat} | ${count} |`)
  .join("\n")}

## Failed Skills (${failedSkills.length})

${failedSkills.length > 0 ? failedSkills.slice(0, 50).map((s) => `- **${s.skill_slug}** (score: ${s.score}) - ${s.summary.critical} critical, ${s.summary.high} high`).join("\n") : "None"}

${failedSkills.length > 50 ? `\n_...and ${failedSkills.length - 50} more_` : ""}

## Skills Requiring Review (${reviewSkills.length})

${reviewSkills.length > 0 ? reviewSkills.slice(0, 30).map((s) => `- **${s.skill_slug}** (score: ${s.score})`).join("\n") : "None"}

${reviewSkills.length > 30 ? `\n_...and ${reviewSkills.length - 30} more_` : ""}

## Skills with Critical Issues (${report.skills_with_critical.length})

${report.skills_with_critical.slice(0, 100).map((slug) => `- ${slug}`).join("\n") || "None"}

${report.skills_with_critical.length > 100 ? `\n_...and ${report.skills_with_critical.length - 100} more_` : ""}
`;
}

main().catch(console.error);
