/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      colors: {
        ink: '#1A1A1A',
        newsprint: '#F4F1EA',
        accent: '#B22222',
        slate: '#5A5A5A',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
}