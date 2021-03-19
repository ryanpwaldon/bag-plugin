import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config.js'

const config = resolveConfig(tailwindConfig)
type Screen = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type ScreenData = Record<Screen, string>

export default () => {
  return () => {
    const screens: Screen[] = []
    const screenData = Object.entries(config.theme.screens as ScreenData).sort((a, b) => parseInt(a[1]) - parseInt(b[1]))
    for (const [screen, size] of screenData) {
      const { matches } = matchMedia(`(min-width: ${size})`)
      matches && screens.push(screen as Screen)
    }
    return screens
  }
}
