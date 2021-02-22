const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./public/**/*.html', './src/**/*.vue'],
  plugins: [require('@tailwindcss/forms')],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        gray: colors.trueGray
      },
      spacing: {
        '124': '31rem',
        '112': '28rem',
        '18': '4.5rem'
      }
    }
  },
  variants: {
    extend: {
      borderColor: ['focus-visible'],
      ringOffsetWidth: ['focus-visible'],
      ringColor: ['focus-visible'],
      ringWidth: ['focus-visible']
    }
  }
}
