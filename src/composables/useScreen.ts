import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config.js'

const config = resolveConfig(tailwindConfig)
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | undefined

export default () => {
  return () => {
    const screens: Breakpoint[] = []
    for (const [screen, size] of Object.entries(config.theme.screens)) {
      const { matches } = matchMedia(`(min-width: ${size})`)
      matches && screens.push(screen as Breakpoint)
    }
    return screens[screens.length - 1]
  }
}
