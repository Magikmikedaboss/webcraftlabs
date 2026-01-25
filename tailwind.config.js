/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [typography],
};

export default config;
