import type { Skill } from "@/data/skills";

export const ENDPOINT_SKILLS: Skill[] = [
    {
        slug: "cloudflare-crawl-endpoint",
        name: "Cloudflare /crawl Endpoint",
        kind: "endpoint",
        category: "endpoints",
        subcategory: "web-crawling",
        description:
            "Asynchronous site crawler from Cloudflare Browser Rendering REST API. Start a crawl job, poll results, and optionally cancel jobs.",
        source_url: "https://developers.cloudflare.com/browser-rendering/rest-api/crawl-endpoint/",
        endpoint_url: "https://api.cloudflare.com/client/v4/accounts/{account_id}/browser-rendering/crawl",
        endpoint_method: "POST",
        auth_type: "api-token",
        framework: "Cloudflare Browser Rendering",
        tags: ["cloudflare", "crawl", "endpoint", "browser-rendering", "scraping", "api"],
        body: `# Cloudflare /crawl Endpoint

Crawl web content from a starting URL and follow links with configurable depth, limits, and output formats.

## Endpoint
\`POST https://api.cloudflare.com/client/v4/accounts/{account_id}/browser-rendering/crawl\`

## Auth
- Header: \`Authorization: Bearer <apiToken>\`
- API token permission: \`Browser Rendering - Edit\`

## Core Flow
1. Initiate crawl job (POST) -> receive job id
2. Poll job status/results:
   \`GET /client/v4/accounts/{account_id}/browser-rendering/crawl/{job_id}\`
3. Optional cancel:
   \`DELETE /client/v4/accounts/{account_id}/browser-rendering/crawl/{job_id}\`

## Required Field
- \`url\` (string)

## Useful Parameters
- \`limit\` (max pages), \`depth\`
- \`formats\` (\`html\`, \`markdown\`, \`json\`)
- \`render\` (true for JS-rendered pages, false for static fetch)
- \`options.includePatterns\`, \`options.excludePatterns\`
- \`maxAge\`, \`modifiedSince\`

## Real Agent Usage
> "Crawl this docs site up to depth 2 in markdown format, exclude changelog pages, and return completed pages only."

## Docs
- https://developers.cloudflare.com/browser-rendering/rest-api/crawl-endpoint/
- https://developers.cloudflare.com/browser-rendering/rest-api/
`,
    },
];
