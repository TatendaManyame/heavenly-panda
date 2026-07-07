// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        clash: ['var(--font-clash-display)', 'Clash Display', 'sans-serif'],
        space: ['var(--font-space-grotesk)', 'Space Grotesk', 'monospace'],
      },
      colors: {
        gold: {
          light: '#F5D78E',
          DEFAULT: '#D4A84B',
          dark: '#C99B3B',
          deeper: '#B8942C',
          text: '#8B7B5C',
        },
      },
    },
  },
  plugins: [],
}