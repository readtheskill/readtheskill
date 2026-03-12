import { ImageResponse } from "next/og";
import { getSkillBySlug } from "@/data/skills";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const skill = getSkillBySlug(category, slug);

  const title = skill?.name ?? "Skill";
  const description = skill?.description ?? "Agent skills directory";
  const framework = skill?.framework ?? "readtheskill";
  const tags = (skill?.tags ?? []).slice(0, 4).join("  •  ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "56px",
          color: "#e5e7eb",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              color: "#22cc88",
              letterSpacing: "0.5px",
              fontWeight: 700,
            }}
          >
            readtheskill.com
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "58px",
              lineHeight: 1.05,
              fontWeight: 800,
              maxWidth: "1040px",
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "29px",
              lineHeight: 1.3,
              color: "#a3a3a3",
              maxWidth: "1040px",
            }}
          >
            {description}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              color: "#d4d4d4",
              padding: "10px 18px",
              borderRadius: "999px",
              border: "1px solid #2a2a2a",
              background: "#111111",
            }}
          >
            {framework}
          </div>
          <div style={{ display: "flex", fontSize: "22px", color: "#8b8b8b" }}>{tags}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
