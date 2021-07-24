const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./public/**/*.html', './src/**/*.vue'],
  plugins: [require('@tailwindcss/forms')],
  theme: {
    extend: {
      screens: {
        xs: '415px'
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        gray: colors.trueGray,
        'text-color-primary': 'var(--text-color-primary)',
        'text-color-secondary': 'var(--text-color-secondary)',
        'button-color-primary': 'var(--button-color-primary)',
        'button-color-secondary': 'var(--button-color-secondary)'
      },
      spacing: {
        '130': '32.5rem',
        '124': '31rem',
        '112': '28rem',
        '18': '4.5rem'
      },
      width: {
        '22': '5.5rem'
      },
      minHeight: {
        '22': '5.5rem',
        '24': '6rem'
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
