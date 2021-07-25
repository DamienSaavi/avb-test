module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#579AFF',
        'light': '#F8FAFF',
        'danger' :'#FF5757',
        'input': '#D7E7FF',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
