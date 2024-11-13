/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green': {
          'dark': '#1A4D2E',
          'light': '#4F6F52',
        },
        'beige': {
          'dark': '#E8DFCA',
          'light': '#F5EFE6',
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-motion'),
  ],
}