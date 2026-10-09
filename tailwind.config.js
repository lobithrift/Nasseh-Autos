/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#C8102E',
          'red-hover': '#A60D24',
          'red-light': '#FFF5F5',
          blue: '#C8102E',
          'blue-hover': '#A60D24',
          'blue-light': '#FFF5F5',
          sky: '#C8102E',
          'sky-bright': '#E53E3E',
          black: '#0A0A0A',
          'gray-dark': '#1F1F1F',
          'gray-medium': '#666666',
          'gray-light': '#F4F4F4',
          'border-gray': '#E5E5E5',
          success: '#16803C',
          warning: '#B7791F',
          error: '#C53030',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
