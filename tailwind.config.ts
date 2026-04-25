import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1e455f",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#FF3D00",
          foreground: "#ffffff",
        },
        background: "#ffffff",
        foreground: "#1e455f",
        border: "#e5e7eb",
        input: "#e5e7eb",
        ring: "#1e455f",
        muted: {
          DEFAULT: "#f3f4f6",
          foreground: "#6b7280",
        },
        accent: {
          DEFAULT: "#f3f4f6",
          foreground: "#1e455f",
        },
        destructive: {
          DEFAULT: "#FF3D00",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#1e455f",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#1e455f",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
}

export default config
