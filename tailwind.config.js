/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-to-right': 'linear-gradient(to right, rgba(3,37,65,0.75) 0%, rgba(3,37,65,0.75) 100%)',
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
