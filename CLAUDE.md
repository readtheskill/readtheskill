# readtheskill — Core Development Rules

## Skills Directory

The `/skills` directory is **infrastructure for agents** to find curated and categorised skills they need to perform better at their everyday tasks and routines.

### What qualifies as a skill
- **Agent skill.md files** — installable skill definitions with instructions
- **MCPs** (Model Context Protocol servers)
- Nothing else. No SaaS products, no generic APIs, no analytics dashboards, no CRMs, no form builders.

### Adding a new skill — required format

Every new skill MUST follow this exact process:

1. **Set `skill_url`** pointing to the remote skill.md URL (e.g. `https://hey.lol/skill.md`)
2. **Content is fetched from `skill_url` at render time** — never hardcoded in the `body` field. This ensures the content auto-updates whenever the source changes.
3. **Fallback chain**: `skill.body` → remote fetch from `skill_url` → local file at `public/skills/{slug}/SKILL.md`
4. **Required fields in `skills.ts`**:
   - `slug` — URL-safe identifier
   - `name` — display name
   - `category` — must match a valid `Category` type
   - `description` — one-liner summary
   - `source_url` — link to the project/repo
   - `skill_url` — link to the raw skill.md file (required for remote fetch)
   - `framework` — the framework/platform name
   - `tags` — array of relevant tags

### Rendered skill page must show:
- Breadcrumb, name, framework badge, description
- Category, subcategory, source link, skill.md link
- Tags
- **Full skill.md content rendered inline** (fetched from `skill_url`)
- CTA block at the bottom
