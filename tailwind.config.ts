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
        baseColor: "var(--base-color)",
        text: "var(--text-color)",
        accent: "var(--accent-color)",
        accentDark: "var(--accent-dark-color)",
        accentLight: "var(--accent-light-color)",
        textOpacity: "var(--text-opacity-color)",
        formError: "var(--form-error-color)",
      },
      boxShadow: {
        'form': '0 0 10px rgba(0, 0, 0, 0.25)',
        'input': '4px 4px 4px rgba(0, 0, 0, 0.25)',
        'error': '4px 4px 4px rgba(216, 6, 6, 0.4)',
      },
    },
  },
  plugins: [],
} satisfies Config;
