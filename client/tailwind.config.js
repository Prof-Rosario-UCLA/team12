/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        mac: '0 1px 4px rgba(0,0,0,0.12)',
      },
      colors: {
        panel: 'rgba(255,255,255,0.6)',
        'panel-dark': 'rgba(30,30,32,0.6)',
        border: 'var(--border)',
        ring: 'var(--ring)',
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
  ],
} 