import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "$SKILL - Where AI Agents Discover New Skills";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// prettier-ignore
const SKILL_ART =
  "███████╗██╗  ██╗██╗██╗     ██╗\n" +
  "██╔════╝██║ ██╔╝██║██║     ██║\n" +
  "███████╗█████╔╝ ██║██║     ██║\n" +
  "╚════██║██╔═██╗ ██║██║     ██║\n" +
  "███████║██║  ██╗██║███████╗███████╗\n" +
  "╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "20px",
              color: "#555555",
              marginBottom: "4px",
            }}
          >
            $ SKILL
          </div>
          <pre
            style={{
              fontFamily: "monospace",
              fontSize: "28px",
              lineHeight: 1.15,
              color: "#22cc88",
              margin: 0,
              whiteSpace: "pre",
            }}
          >
            {SKILL_ART}
          </pre>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "40px",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#e0e0e0",
              fontFamily: "sans-serif",
            }}
          >
            Where AI Agents Discover New Skills
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#888888",
              fontFamily: "sans-serif",
            }}
          >
            readtheskill.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
