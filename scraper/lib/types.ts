export interface RawSkillRecord {
  slug: string;
  name: string;
  description: string;
  github_url?: string;
  repo_owner?: string;
  repo_name?: string;
  clawhub_url: string;
  tags?: string[];
  created_at?: string;
  updated_at?: string;
  raw_api_response: unknown;
}

export interface ResolvedSkillRecord extends RawSkillRecord {
  skill_url?: string;
  skill_url_method?: "probe" | "branch-detect" | "tree-search" | "fallback";
  skill_url_confidence: number;
  resolution_error?: string;
}

export interface ValidatedSkillRecord extends ResolvedSkillRecord {
  skill_content?: string;
  content_hash?: string;
  structural_valid: boolean;
  structural_errors?: string[];
  actionability_score: number;
  tier: "indexed" | "validated" | "verified";
  validation_error?: string;
}

export interface CategorizedSkillRecord extends ValidatedSkillRecord {
  category: string;
  subcategory?: string;
  category_confidence: number;
  extracted_tags: string[];
}

export interface SecurityScanRecord extends CategorizedSkillRecord {
  security_score: number;
  security_badge: "pass" | "warn" | "review" | "fail";
  security_findings_count: number;
  security_critical_count: number;
}

export interface DedupeResult {
  action: "new" | "enrich" | "skip";
  existing_slug?: string;
  reason?: string;
}

export interface ProcessedSkillRecord extends SecurityScanRecord {
  dedupe: DedupeResult;
}

export interface ClawHubSearchResult {
  slug: string;
  name: string;
  description?: string;
  tags?: string[];
}

export interface ClawHubApiSkill {
  slug: string;
  displayName: string;
  summary?: string;
  tags?: Record<string, string>;
  stats?: {
    downloads?: number;
    stars?: number;
  };
  createdAt?: number;
  updatedAt?: number;
}

export interface ClawHubApiOwner {
  handle: string;
  displayName?: string;
}

export interface ClawHubDetailResult {
  skill: ClawHubApiSkill;
  owner?: ClawHubApiOwner;
  latestVersion?: {
    version?: string;
    changelog?: string;
  };
}

export interface PipelineStats {
  discovered: number;
  resolved: number;
  validated: number;
  categorized: number;
  security_scanned: number;
  security_passed: number;
  security_failed: number;
  new_skills: number;
  enriched_skills: number;
  skipped_skills: number;
  by_category: Record<string, number>;
  by_tier: Record<string, number>;
  by_security_badge: Record<string, number>;
  errors: string[];
}
