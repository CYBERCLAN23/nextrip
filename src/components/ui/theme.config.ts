// Tailwind config
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0A3D91",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#1D5FD1",
          foreground: "#FFFFFF",
        },
        deep: {
          DEFAULT: "#071A52",
          foreground: "#FFFFFF",
        },
        cyan: {
          DEFAULT: "#00D9FF",
          foreground: "#071A52",
        },
        accent: {
          DEFAULT: "#D81F2A",
          foreground: "#FFFFFF",
        },
        white: {
          DEFAULT: "#FFFFFF",
          foreground: "#071A52",
        },
        light: {
          DEFAULT: "#F5F7FA",
          foreground: "#1C2434",
        },
        text: {
          DEFAULT: "#1C2434",
          secondary: "#667085",
        },
        glass: {
          DEFAULT: "rgba(255, 255, 255, 0.1)",
          strong: "rgba(255, 255, 255, 0.25)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Instrument Serif", "Georgia", "serif"],
        mono: ["SF Mono", "Monaco", "Courier New", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}