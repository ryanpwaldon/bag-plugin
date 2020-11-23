const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  plugins: [require('@tailwindcss/ui')],
  purge: ['./public/**/*.html', './src/**/*.vue'],
  theme: {
    extend: {
      spacing: {
        '124': '31rem',
        '112': '28rem',
        '18': '4.5rem'
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'true-gray': {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717'
        }
      }
    }
  },
  variants: {
    opacity: ({ after }) => after(['focus-within']),
    pointerEvents: ({ after }) => after(['group-focus', 'focus-within'])
  }
}
