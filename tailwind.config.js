/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      fontFamily: {
        bodoni: ["Bodoni", "sans-serif"],
        "bodoni-italic": ["Bodoni-Italic", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"]
      }
    },
  },
  plugins: [],
}

