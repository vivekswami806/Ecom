/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:  
       {
        // Define custom background images or override existing ones
        'backimg': "url('/src/assets/backimg.png')",
      },
    },
  },
  plugins: [],
}