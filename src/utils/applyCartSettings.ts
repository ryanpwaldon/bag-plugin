import { merge } from 'lodash'
import { connectedToParentFrame, getParentFrame } from '@/composables/useParentFrame'

// const defaultCartSettings = {
//   backdropColor: '#0b3b36',
//   backdropOpacity: 0.25,
//   borderColor1: '#CDE5CD',
//   brightness1: 0.975,
//   cartPadding: 0,
//   roundCorners: true,
//   showBorders: true,
//   showShadows: false,
//   textColor1: '#171717',
//   textColor2: '#5c5c5c',
//   textColor3: '#ffffff',
//   themeColor1: '#F2F8F2',
//   themeColor2: '#ffffff',
//   themeColor3: '#0b3b36'
// }

const defaultCartSettings = {
  backdropColor: '#000000',
  backdropOpacity: 0.5,
  borderColor1: '#E5E5E5',
  brightness1: 0.1,
  cartPadding: 0,
  roundCorners: true,
  showBorders: false,
  showShadows: true,
  textColor1: '#171717',
  textColor2: '#737373',
  textColor3: '#ffffff',
  themeColor1: '#F5F5F5',
  themeColor2: '#ffffff',
  themeColor3: '#2563EB'
}

// const defaultCartSettings = {
//   backdropColor: '#000000',
//   backdropOpacity: 0.5,
//   borderColor1: '#333333',
//   brightness1: 0.5,
//   cartPadding: 24,
//   roundCorners: false,
//   showBorders: true,
//   showShadows: true,
//   textColor1: '#ffffff',
//   textColor2: '#7d7d7d',
//   textColor3: '#ffffff',
//   themeColor1: '#121212',
//   themeColor2: '#222222',
//   themeColor3: '#0099cc'
// }

type CartSettings = typeof defaultCartSettings

const getMergedCartSettings = async (): Promise<CartSettings> => {
  await connectedToParentFrame
  const userCartSettings = await getParentFrame().getUserCartSettings()
  return merge(defaultCartSettings, userCartSettings)
}

// prettier-ignore
const getCssVariables = (cartSettings: CartSettings) => {
  console.log(((1 - cartSettings.brightness1 * 0.2)))
  return {
    backdropColor: cartSettings.backdropColor,
    backdropOpacity: cartSettings.backdropOpacity.toString(),
    borderColor1: cartSettings.borderColor1,
    borderWidth1: cartSettings.showBorders ? '1px' : '0px',
    brightness1: (1 - cartSettings.brightness1 * 0.2).toString(),
    brightness2: ((1 - cartSettings.brightness1 * 0.2) - 0.04).toString(),
    cartPadding: `${cartSettings.cartPadding}px`,
    cartRoundness: cartSettings.cartPadding === 0 ? '0px' : '4px',
    roundness1: cartSettings.roundCorners ? '4px' : '0px',
    roundness2: cartSettings.roundCorners ? '2px' : '0px',
    shadow1: cartSettings.showShadows ? 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px' : 'none',
    shadow2: cartSettings.showShadows ? 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px' : 'none',
    textColor1: cartSettings.textColor1,
    textColor2: cartSettings.textColor2,
    textColor3: cartSettings.textColor3,
    themeColor1: cartSettings.themeColor1,
    themeColor2: cartSettings.themeColor2,
    themeColor3: cartSettings.themeColor3,
  }
}

const setCssVariables = (cssVariables: Record<string, string>) => {
  const root = document.documentElement
  Object.entries(cssVariables).forEach(([key, value]) => root.style.setProperty(`--${key}`, value))
}

export const applyCartSettings = async () => {
  const mergedCartSettings = await getMergedCartSettings()
  const cssVariables = getCssVariables(mergedCartSettings)
  setCssVariables(cssVariables)
}
