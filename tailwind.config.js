/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0f0f0f',
          card: '#1a1a1a',
          cardAlt: '#242424',
          text: '#ffffff',
          muted: '#888888',
          orange: '#F7931A',
        },
      },
    },
  },
  plugins: [],
};
