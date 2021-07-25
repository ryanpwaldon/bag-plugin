import { merge } from 'lodash'
import defaultCartSettings from '@/settings/defaultCartSettings'
import { connectedToParentFrame, getParentFrame } from '@/composables/useParentFrame'

const applyStyles = (cssVariables: typeof defaultCartSettings.cssVariables) => {
  const root = document.documentElement
  Object.entries(cssVariables).forEach(([key, value]) => root.style.setProperty(`--${key}`, value))
}

export default async () => {
  await connectedToParentFrame
  const userCartSettings = await getParentFrame().getUserCartSettings()
  const cartSettings = merge(defaultCartSettings, userCartSettings)
  applyStyles(cartSettings.cssVariables)
}
