/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
      },
      colors: {
        /* Primary Brand Color - Purple */
        purple: {
          50: '#F5F1FF',
          100: '#EBE3FF',
          500: '#6A2CFF',
          600: '#5A1FCC',
          700: '#4A1599',
        },
        
        /* Secondary Colors */
        'light-grey': '#F5F5F7',
        'mid-grey': '#BDBDBD',
        
        /* Promotional Colors */
        'brand-orange': '#FF6A00',
        'brand-red': '#FF3B30',
      },
    },
  },
  plugins: [],
}
