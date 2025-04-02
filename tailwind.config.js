/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#1B263B', // midnight blue
        secondary: '#B87333', // warm copper
        accent: '#C0C0C0', // silver
        background: '#F7F7F7', // soft white
        heatmap: {
        }
      }
    },
  },
  plugins: [],
}