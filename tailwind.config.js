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
    'Caveat Brush': ['Caveat Brush', 'cursive'],
    'Lato': ['Lato', 'sans-serif'],
    'Quicksand': ['Quicksand', 'sans-serif'],
  },
},
  plugins: []
} 

