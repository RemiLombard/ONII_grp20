/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend:{
    colors: {
      nightblue: '#190936'
    }
  },
  fontFamily: {
    'Passion One': ['Passion One', 'sans-serif'],
    'Lato': ['Lato', 'sans-serif'],
  },
},
  plugins: []
} 

