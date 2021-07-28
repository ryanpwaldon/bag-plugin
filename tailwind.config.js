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
        fontFamilyPrimary: ['Inter var', ...defaultTheme.fontFamily.sans],
        fontFamilySecondary: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      opacity: {
        opacityBackdrop: 'var(--opacityBackdrop)'
      },
      colors: {
        colorTextPrimary: 'var(--colorTextPrimary)',
        colorTextSecondary: 'var(--colorTextSecondary)',
        colorBackdrop: 'var(--colorBackdrop)',
        colorBackground: 'var(--colorBackground)',
        colorBorderPrimary: 'var(--colorBorderPrimary)',
        colorProgressBarPrimary: 'var(--colorProgressBarPrimary)',
        colorButtonPrimaryBackground: 'var(--colorButtonPrimaryBackground)',
        colorButtonPrimaryText: 'var(--colorButtonPrimaryText)',
        colorTextLink: 'var(--colorTextLink)',
        gray: colors.trueGray
      },
      borderWidth: {
        borderWidthPrimary: 'var(--borderWidthPrimary)'
      },
      boxShadow: {
        shadowPrimary: 'var(--shadowPrimary)',
        shadowSecondary: 'var(--shadowSecondary)'
      },
      borderRadius: {
        borderRadiusPrimary: 'var(--borderRadiusPrimary)',
        borderRadiusSecondary: 'var(--borderRadiusSecondary)',
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
