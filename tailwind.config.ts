import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#f8f2ea",
        mist: "#a9a29a",
        line: "rgba(248, 242, 234, 0.13)",
        panel: "rgba(255, 255, 255, 0.035)",
        coral: "#ff6b57",
        rose: "#d95f8d",
        powder: "#8fb7ff",
        "terminal-line": "rgba(174, 197, 221, 0.16)"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0, 0, 0, 0.32)"
      },
      borderRadius: {
        panel: "0.5rem"
      },
      maxWidth: {
        copy: "42rem"
      },
      fontFamily: {
        sans: ["'Avenir Next'", "'Segoe UI'", "sans-serif"],
        serif: ["'Iowan Old Style'", "'Palatino Linotype'", "serif"],
        mono: ["'SFMono-Regular'", "Menlo", "Monaco", "Consolas", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
