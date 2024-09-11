import type { Config } from "tailwindcss"

const config = {
  darkMode: ["selector"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
      },
      fontSize: {
        xxs: ["0.55rem", { lineHeight: "0.85rem" }],
        // "xs": ["0.65rem", { lineHeight: "0.85rem" }],
        // "sm": ["0.85rem", { lineHeight: "1.05rem" }],
        // "base": ["0.975rem", { lineHeight: "1.35rem" }],
        // "lg": ["1.1rem", { lineHeight: "1.6rem" }],
        // "xl": ["1.35rem", { lineHeight: "1.85rem" }],
        // "2xl": ["1.6rem", { lineHeight: "2.1rem" }],
        // "3xl": ["1.85rem", { lineHeight: "2.25rem" }],
        // "4xl": ["2.1rem", { lineHeight: "2.45rem" }],
        // "5xl": ["2.6rem", { lineHeight: "2.6rem" }],
        // "6xl": ["3.25rem", { lineHeight: "3.25rem" }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
