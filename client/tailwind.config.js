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
      // Placeholder for Shadcn colors, radii, keyframes, etc.
      // These are often added by `shadcn-ui init` or when adding components
      // For now, we'll leave it minimal and add if specific components need them
    },
  },
  plugins: [
    tailwindcssAnimate
  ],
} 