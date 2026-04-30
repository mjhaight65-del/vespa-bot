import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#08090b",
        surface: "#111318",
        "surface-2": "#171a21",
        border: "#23262f",
        muted: "#8b92a0",
        accent: {
          DEFAULT: "#a3e635", // lime-400
          soft: "#bef264",
          deep: "#65a30d",
        },
        fire: {
          DEFAULT: "#fb923c", // orange-400
          soft: "#fdba74",
          deep: "#ea580c",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 10px 40px -10px rgba(163, 230, 53, 0.45)",
        fire: "0 10px 40px -10px rgba(251, 146, 60, 0.45)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
