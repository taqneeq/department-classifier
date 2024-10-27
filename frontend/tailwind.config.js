/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['"DM Mono"', "monospace"],
        gameplay: ["var(--font-gameplay)"],
        joganSoft: ["var(--font-jogan-soft)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'noise': "url('/public/noise.png')",
      },
    },
  },
  plugins: [],
};
