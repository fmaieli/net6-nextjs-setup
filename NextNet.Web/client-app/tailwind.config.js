const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
       colors: {
         grey: {
           150: '#F0F0F0',
         },
         'white': '#ffffff',
         'mainBlue': 'rgba(28, 124, 213, 1)',
       },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
