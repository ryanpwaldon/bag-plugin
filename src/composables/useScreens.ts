import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config.js'
import { getParentFrame } from '@/composables/useParentFrame'

const config = resolveConfig(tailwindConfig)
type Screen = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type ScreenData = Record<Screen, string>

export default () => {
  return async () => {
    const screens: Screen[] = []
    const innerWidth = await getParentFrame().getWindowInnerWidth()
    const screenData = Object.entries(config.theme.screens as ScreenData).sort((a, b) => parseInt(a[1]) - parseInt(b[1]))
    for (const [screen, size] of screenData) if (innerWidth >= parseInt(size)) screens.push(screen as Screen)
    return screens
  }
}
