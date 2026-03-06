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
          red: "#ff4444",
          blue: "#4488ff",
          green: "#22cc88",
          orange: "#ffaa22",
          purple: "#aa66ff",
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
