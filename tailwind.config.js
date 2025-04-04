/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        'onyx': '#111111',        // Primary
        'bone': '#F9F9F6',        // Secondary
        'electric': '#00D1FF',    // Accent 1
        'glitch': '#FF004D',      // Accent 2
        'graphite': '#666666',    // Neutral
        'fog': '#DDDDDD',         // Neutral
      },
      keyframes: {
        scanline: {
          'from': { transform: 'translateX(-100%)' },
          'to': { transform: 'translateX(100%)' }
        }
      }
    },
  },
  plugins: [],
} 