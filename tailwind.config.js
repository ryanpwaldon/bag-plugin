const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  plugins: [require('@tailwindcss/ui')],
  purge: ['./public/**/*.html', './src/**/*.vue'],
  theme: {
    extend: {
      spacing: {
        '112': '28rem'
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  variants: {
    opacity: ({ after }) => after(['focus-within']),
    pointerEvents: ({ after }) => after(['group-focus', 'focus-within'])
  }
}
