import { merge } from 'lodash'
import { connectedToParentFrame, getParentFrame } from '@/composables/useParentFrame'

const defaultCartSettings = {
  colorBackdrop: '#000000',
  colorBackground: '#F5F5F5',
  colorBorderPrimary: '#E5E5E5',
  colorButtonPrimaryBackground: '#171717',
  colorButtonPrimaryText: '#FFFFFF',
  colorProgressBarPrimary: '#404040',
  colorTextLink: '#2563EB',
  colorTextPrimary: '#171717',
  colorTextSecondary: '#737373',
  displayBorders: false,
  displayShadows: true,
  opacityBackdrop: 0.5,
  paddingCart: 0,
  roundedCorners: true
}

type CartSettings = typeof defaultCartSettings

const getMergedCartSettings = async (): Promise<CartSettings> => {
  await connectedToParentFrame
  const userCartSettings = await getParentFrame().getUserCartSettings()
  return merge(defaultCartSettings, userCartSettings)
}

// prettier-ignore
const getCssVariables = (cartSettings: CartSettings) => {
  const staticCssVariables = {
    colorBackdrop: defaultCartSettings.colorBackdrop,
    colorBackground: defaultCartSettings.colorBackground,
    colorBorderPrimary: defaultCartSettings.colorBorderPrimary,
    colorButtonPrimaryBackground: defaultCartSettings.colorButtonPrimaryBackground,
    colorButtonPrimaryText: defaultCartSettings.colorButtonPrimaryText,
    colorProgressBarPrimary: defaultCartSettings.colorProgressBarPrimary,
    colorTextLink: defaultCartSettings.colorTextLink,
    colorTextPrimary: defaultCartSettings.colorTextPrimary,
    colorTextSecondary: defaultCartSettings.colorTextSecondary,
    opacityBackdrop: defaultCartSettings.opacityBackdrop.toString()
  }
  const computedCssVariables = {
    borderRadiusCart: defaultCartSettings.paddingCart === 0 ? '0px' : '4px',
    borderRadiusPrimary: cartSettings.roundedCorners ? '4px' : '0px',
    borderRadiusSecondary: cartSettings.roundedCorners ? '2px' : '0px',
    borderWidthPrimary: cartSettings.displayBorders ? '1px' : '0px',
    paddingCart: `${defaultCartSettings.paddingCart}px`,
    shadowPrimary: cartSettings.displayShadows ? 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px' : 'none',
    shadowSecondary: cartSettings.displayShadows ? 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px' : 'none'
  }
  return { ...staticCssVariables, ...computedCssVariables }
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
