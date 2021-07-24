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
        colorBackdrop: 'var(--colorBackdrop)',
        colorBackground: 'var(--colorBackground)',
        colorProgressBarPrimary: 'var(--colorProgressBarPrimary)',
        colorProgressBarSecondary: 'var(--colorProgressBarSecondary)',
        colorButtonPrimaryBackground: 'var(--colorButtonPrimaryBackground)',
        colorButtonPrimaryText: 'var(--colorButtonPrimaryText)',
        colorAccentPrimary: 'var(--colorAccentPrimary)',
        gray: colors.trueGray
      },
      borderRadius: {
        borderRadiusCart: 'var(--borderRadiusCart)'
      },
      spacing: {
        paddingCart: 'var(--paddingCart)'
      },
      width: {
        '130': '32.5rem',
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
