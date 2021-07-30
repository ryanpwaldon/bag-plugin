import { merge } from 'lodash'
import { connectedToParentFrame, getParentFrame } from '@/composables/useParentFrame'

const defaultCartSettings = {
  backdropColor: '#000000',
  backdropOpacity: 0.5,
  borderColor1: '#E5E5E5',
  brightness1: 0.1,
  cartPadding: 0,
  checkoutButtonColor: '#171717',
  checkoutButtonTextColor: '#ffffff',
  progressBarColor: '#171717',
  roundCorners: true,
  showBorders: false,
  showShadows: true,
  textColor1: '#171717',
  textColor2: '#737373',
  textColor3: '#2563EB',
  themeColor1: '#F5F5F5',
  themeColor2: '#ffffff'
}

type CartSettings = typeof defaultCartSettings

const getMergedCartSettings = async (): Promise<CartSettings> => {
  await connectedToParentFrame
  const userCartSettings = await getParentFrame().getUserCartSettings()
  return merge(defaultCartSettings, userCartSettings)
}

// prettier-ignore
const getCssVariables = (cartSettings: CartSettings) => ({
  backdropColor: cartSettings.backdropColor,
  backdropOpacity: cartSettings.backdropOpacity.toString(),
  borderColor1: cartSettings.borderColor1,
  borderWidth1: cartSettings.showBorders ? '1px' : '0px',
  brightness1: (1 - cartSettings.brightness1 * 0.2).toString(),
  brightness2: ((1 - cartSettings.brightness1 * 0.2) - 0.04).toString(),
  cartPadding: `${cartSettings.cartPadding}px`,
  cartRoundness: cartSettings.cartPadding === 0 ? '0px' : '4px',
  checkoutButtonColor: cartSettings.checkoutButtonColor,
  checkoutButtonTextColor: cartSettings.checkoutButtonTextColor,
  progressBarColor: cartSettings.progressBarColor,
  roundness1: cartSettings.roundCorners ? '4px' : '0px',
  roundness2: cartSettings.roundCorners ? '2px' : '0px',
  shadow1: cartSettings.showShadows ? 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px' : 'none',
  shadow2: cartSettings.showShadows ? 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px' : 'none',
  textColor1: cartSettings.textColor1,
  textColor2: cartSettings.textColor2,
  textColor3: cartSettings.textColor3,
  themeColor1: cartSettings.themeColor1,
  themeColor2: cartSettings.themeColor2
})

const setCssVariables = (cssVariables: Record<string, string>) => {
  const root = document.documentElement
  Object.entries(cssVariables).forEach(([key, value]) => root.style.setProperty(`--${key}`, value))
}

export const applyCartSettings = async () => {
  const mergedCartSettings = await getMergedCartSettings()
  const cssVariables = getCssVariables(mergedCartSettings)
  setCssVariables(cssVariables)
}
