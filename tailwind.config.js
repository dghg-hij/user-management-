/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        dark: {
          900: '#0F1117',
          800: '#151827',
          700: '#1A1D2E',
          600: '#252840',
        },
        amber: {
          500: '#F59E0B',
        },
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        sans: ['Noto Sans SC', 'Sora', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
