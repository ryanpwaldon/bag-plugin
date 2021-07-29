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
        fontFamily1: ['Inter var', ...defaultTheme.fontFamily.sans],
        fontFamilySecondary: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      opacity: {
        backdropOpacity: 'var(--backdropOpacity)'
      },
      colors: {
        backdropColor: 'var(--backdropColor)',
        borderColor1: 'var(--borderColor1)',
        textColor1: 'var(--textColor1)',
        textColor2: 'var(--textColor2)',
        textColor3: 'var(--textColor3)',
        themeColor1: 'var(--themeColor1)',
        themeColor2: 'var(--themeColor2)',
        themeColor3: 'var(--themeColor3)',
        gray: colors.trueGray
      },
      borderWidth: {
        borderWidth1: 'var(--borderWidth1)'
      },
      boxShadow: {
        shadow1: 'var(--shadow1)',
        shadow2: 'var(--shadow2)'
      },
      borderRadius: {
        roundness1: 'var(--roundness1)',
        roundness2: 'var(--roundness2)',
        cartRoundness: 'var(--cartRoundness)'
      },
      spacing: {
        cartPadding: 'var(--cartPadding)'
      },
      width: {
        '130': '32.5rem',
        '22': '5.5rem'
      },
      minHeight: {
        '22': '5.5rem',
        '24': '6rem'
      },
      brightness: {
        brightness1: 'var(--brightness1)',
        brightness2: 'var(--brightness2)'
      },
      transitionProperty: {
        filter: 'filter'
      }
    }
  },
  variants: {
    extend: {
      borderColor: ['focus-visible'],
      ringOffsetWidth: ['focus-visible'],
      ringColor: ['focus-visible'],
      ringWidth: ['focus-visible'],
      brightness: ['hover']
    }
  }
}
