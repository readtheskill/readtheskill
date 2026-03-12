import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0a0a0a",
          surface: "#141414",
          elevated: "#1c1c1c",
          hover: "#222222",
        },
        border: "#2a2a2a",
        "border-light": "#3a3a3a",
        accent: "#ff4500",
        green: "#22cc88",
        "text-primary": "#e0e0e0",
        "text-secondary": "#888888",
        "text-muted": "#555555",
        stat: {
          yellow: "#F5C518",
          green: "#00C9A7",
          blue: "#4D9FFF",
          orange: "#FF8C42",
          purple: "#A855F7",
          red: "#FF4D4D",
        },
      },
      fontFamily: {
        sans: ["Verdana", "Tahoma", "Geneva", "system-ui", "sans-serif"],
        mono: ['"Courier New"', "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
