/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      screens: {
        'sm': '640px', // Default, modify if needed
        'md': '820px', // Default, modify if needed
        'lg': '1024px', // Default, modify if needed
        'xl': '1280px', // Default, modify if needed
        '2xl': '1536px', // Default, modify if needed
      },
    },
  },
  plugins: [],
}

