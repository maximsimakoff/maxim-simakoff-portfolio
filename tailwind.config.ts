import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#f5f3ef",
        mist: "#a8a29e",
        line: "rgba(245, 243, 239, 0.12)",
        panel: "rgba(255, 255, 255, 0.03)"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0, 0, 0, 0.32)"
      },
      borderRadius: {
        panel: "1.5rem"
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
