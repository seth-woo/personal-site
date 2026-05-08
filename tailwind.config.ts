import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        text: "var(--color-text)",
        muted: "var(--color-muted)",
        "very-muted": "var(--color-very-muted)",
        border: "var(--color-border)",
        "hover-bg": "var(--color-hover-bg)"
      },
      fontFamily: {
        sans: ["var(--font-ibm-plex-mono)", "monospace"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
