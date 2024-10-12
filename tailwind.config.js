/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    screens: {
      sm: "810px",
      md: "928px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",

      "custom-xs": "480px",
      "custom-lg": "1400px",
    },
    extend: {
      fontSize: {
        lg: "32px",
        md: "16px",
        sm: "12px",
      },
      lineHeight: {
        1: "48px",
        2: "24px",
        3: "18px",
      },
      colors: {
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        error: "hsl(var(--error))",
        success: "hsl(var(--success))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        tertiary: "hsl(var(--tertiary))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: {
          DEFAULT: "hsl(var(--border))",
          active: "hsl(var(--primary-foreground))",
        },
        primaryButton: {
          DEFAULT: "hsl(var(--primary-foreground))",
          foreground: "hsl(var(--background))",
        },
        secondaryButton: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          active: "hsl(var(--secondary-active-button))",
        },
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
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
