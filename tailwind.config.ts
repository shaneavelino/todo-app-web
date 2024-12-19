import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#1E6F9F",
        blue: {
          DEFAULT: "#4EA8DE",
        },
        gray: {
          light: "#333333",
        },
        purple: {
          light: "#5E60CE",
          DEFAULT: "#8284FA",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
