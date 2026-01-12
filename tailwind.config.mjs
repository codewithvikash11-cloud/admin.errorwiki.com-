export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        panel: "var(--panel)",
        surface: {
          DEFAULT: "var(--surface)",
          highlight: "var(--surface-highlight)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
        },
        accent: {
          primary: "var(--accent-primary)",
          hover: "var(--accent-hover)",
          success: "var(--accent-success)",
          warning: "var(--accent-warning)",
          error: "var(--accent-error)",
          info: "var(--accent-info)",
        },
        border: "var(--border)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
