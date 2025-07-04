/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary Colors (Violet)
        primary: "#7c3aed",
        "primary-50": "#2a223a",
        "primary-100": "#3b2f4c",
        "primary-500": "#a78bfa",
        "primary-600": "#8b5cf6",
        "primary-700": "#7c3aed",
        "primary-800": "#6d28d9",
        "primary-900": "#4c1d95",

        // Secondary Colors (Slate/Gray)
        secondary: "#334155",
        "secondary-50": "#18181b",
        "secondary-100": "#27272a",
        "secondary-200": "#3f3f46",
        "secondary-300": "#52525b",
        "secondary-400": "#71717a",
        "secondary-500": "#a1a1aa",
        "secondary-600": "#d4d4d8",
        "secondary-700": "#e4e4e7",
        "secondary-800": "#f4f4f5",
        "secondary-900": "#fafafa",

        // Accent Colors (Cyan)
        accent: "#06b6d4",
        "accent-50": "#164e63",
        "accent-100": "#155e75",
        "accent-200": "#0891b2",
        "accent-300": "#22d3ee",
        "accent-400": "#67e8f9",
        "accent-500": "#a5f3fc",
        "accent-600": "#cffafe",
        "accent-700": "#ecfeff",
        "accent-800": "#f0fdfa",
        "accent-900": "#f0fdfa",

        // Background/Surface
        background: "#18181b",
        surface: "#232336",
        "surface-hover": "#26263a",
        "surface-active": "#312e43",

        // Text
        "text-primary": "#f4f4f5",
        "text-secondary": "#a1a1aa",
        "text-tertiary": "#71717a",
        "text-disabled": "#3f3f46",

        // Status
        success: "#22c55e",
        "success-50": "#052e16",
        "success-100": "#166534",
        "success-500": "#22c55e",
        "success-600": "#16a34a",
        "success-700": "#15803d",
        warning: "#eab308",
        "warning-50": "#422006",
        "warning-100": "#713f12",
        "warning-500": "#eab308",
        "warning-600": "#ca8a04",
        "warning-700": "#a16207",
        error: "#ef4444",
        "error-50": "#450a0a",
        "error-100": "#7f1d1d",
        "error-500": "#ef4444",
        "error-600": "#dc2626",
        "error-700": "#b91c1c",
        // Border
        "border-light": "#27272a",
        "border-medium": "#3f3f46",
        "border-dark": "#52525b",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        data: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        240: "240px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.1)",
        modal: "0 10px 25px rgba(0, 0, 0, 0.15)",
        "elevation-1": "0 1px 3px rgba(0, 0, 0, 0.1)",
        "elevation-2": "0 4px 6px rgba(0, 0, 0, 0.1)",
        "elevation-3": "0 10px 25px rgba(0, 0, 0, 0.15)",
      },
      transitionDuration: {
        200: "200ms",
        300: "300ms",
      },
      transitionTimingFunction: {
        "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
        "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      zIndex: {
        100: "100",
        200: "200",
        300: "300",
        1000: "1000",
      },
    },
  },
  plugins: [],
};
