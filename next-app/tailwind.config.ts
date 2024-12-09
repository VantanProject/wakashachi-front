import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        base: "var(--base-color)",
        text: "var(--text-color)",
        accent: "var(--accent-color)",
        accentDark: "var(--accent-dark-color)",
        accentLight: "var(--accent-light-color)",
        textOpacity: "var(--text-opacity-color)",
        formError: "var(--form-error-color)",
      },
    },
  },
  plugins: [],
} satisfies Config;
