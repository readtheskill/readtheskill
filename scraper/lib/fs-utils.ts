import * as fs from "fs";
import * as path from "path";

const SCRAPER_ROOT = path.join(process.cwd(), "scraper");
const OUT_DIR = path.join(SCRAPER_ROOT, "out");
const RAW_DIR = path.join(OUT_DIR, "raw");
const PROCESSED_DIR = path.join(OUT_DIR, "processed");

export function ensureDirs(): void {
  [OUT_DIR, RAW_DIR, PROCESSED_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

export function writeRawSnapshot(filename: string, data: unknown): void {
  ensureDirs();
  const filepath = path.join(RAW_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
}

export function readRawSnapshot<T>(filename: string): T | null {
  const filepath = path.join(RAW_DIR, filename);
  if (!fs.existsSync(filepath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(filepath, "utf-8"));
}

export function writeProcessedData(filename: string, data: unknown): void {
  ensureDirs();
  const filepath = path.join(PROCESSED_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
}

export function readProcessedData<T>(filename: string): T | null {
  const filepath = path.join(PROCESSED_DIR, filename);
  if (!fs.existsSync(filepath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(filepath, "utf-8"));
}

export function listRawSnapshots(): string[] {
  ensureDirs();
  return fs.readdirSync(RAW_DIR).filter((f) => f.endsWith(".json"));
}

export function listProcessedFiles(): string[] {
  ensureDirs();
  return fs.readdirSync(PROCESSED_DIR).filter((f) => f.endsWith(".json"));
}

export function getOutputPath(subdir: "raw" | "processed", filename: string): string {
  ensureDirs();
  return path.join(subdir === "raw" ? RAW_DIR : PROCESSED_DIR, filename);
}
