import { merge } from 'lodash'
import { connectedToParentFrame, getParentFrame } from '@/composables/useParentFrame'

// default
// const defaultCartSettings = {
//   borderRadiusCart: '4px',
//   colorAccentPrimary: '#2563EB',
//   colorBackdrop: 'rgba(0, 0, 0, 0.5)',
//   colorBackground: '#F5F5F5',
//   colorBorderPrimary: '#D4D4D4',
//   colorButtonPrimaryBackground: '#171717',
//   colorButtonPrimaryText: '#FFFFFF',
//   colorProgressBarPrimary: '#404040',
//   colorProgressBarSecondary: '#F5F5F5',
//   colorTextPrimary: '#171717',
//   colorTextSecondary: '#737373',
//   fontFamilyPrimary: 'Inter',
//   fontFamilySecondary: 'Inter',
//   paddingCart: '12px',
//   displayShadows: true,
//   displayBorders: false,
// }

// molleni
// const defaultCartSettings = {
//   borderRadiusCart: '0px',
//   colorAccentPrimary: '#f94c43',
//   colorBackdrop: 'rgba(0, 0, 0, 0.5)',
//   colorBackground: '#ffffff',
//   colorBorderPrimary: '#e7e7e7',
//   colorButtonPrimaryBackground: '#f94c43',
//   colorButtonPrimaryText: '#ffffff',
//   colorProgressBarPrimary: '#f94c43',
//   colorProgressBarSecondary: '#ffffff',
//   colorTextPrimary: '#5c5c5c',
//   colorTextSecondary: '#939393',
//   fontFamilyPrimary: 'Inter, sans',
//   fontFamilySecondary: 'Inter, sans',
//   paddingCart: '0px',
//   displayShadows: false,
//   displayBorders: true,
//   roundedCorners: false
// }

const defaultCartSettings = {
  borderRadiusCart: '0px',
  colorAccentPrimary: '#6ba8d4',
  colorBackdrop: 'rgba(0, 0, 0, 0.5)',
  colorBackground: '#fafafa',
  colorBorderPrimary: '#e8e9eb',
  colorButtonPrimaryBackground: '#6ba8d4',
  colorButtonPrimaryText: '#ffffff',
  colorProgressBarPrimary: '#6ba8d4',
  colorProgressBarSecondary: '#f5f5f5',
  colorTextPrimary: '#000000',
  colorTextSecondary: '#8d8d8d',
  fontFamilyPrimary: 'Inter, sans',
  fontFamilySecondary: 'Inter, sans',
  paddingCart: '0px',
  displayShadows: false,
  displayBorders: true,
  roundedCorners: false
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
    borderRadiusCart: defaultCartSettings.borderRadiusCart,
    colorAccentPrimary: defaultCartSettings.colorAccentPrimary,
    colorBackdrop: defaultCartSettings.colorBackdrop,
    colorBackground: defaultCartSettings.colorBackground,
    colorBorderPrimary: defaultCartSettings.colorBorderPrimary,
    colorButtonPrimaryBackground: defaultCartSettings.colorButtonPrimaryBackground,
    colorButtonPrimaryText: defaultCartSettings.colorButtonPrimaryText,
    colorProgressBarPrimary: defaultCartSettings.colorProgressBarPrimary,
    colorProgressBarSecondary: defaultCartSettings.colorProgressBarSecondary,
    colorTextPrimary: defaultCartSettings.colorTextPrimary,
    colorTextSecondary: defaultCartSettings.colorTextSecondary,
    fontFamilyPrimary: defaultCartSettings.fontFamilyPrimary,
    fontFamilySecondary: defaultCartSettings.fontFamilySecondary,
    paddingCart: defaultCartSettings.paddingCart
  }
  const computedCssVariables = {
    shadowPrimary: cartSettings.displayShadows ? 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px' : 'none',
    shadowSecondary: cartSettings.displayShadows ? 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px' : 'none',
    borderWidthPrimary: cartSettings.displayBorders ? '1px' : '0px',
    borderRadiusPrimary: cartSettings.roundedCorners ? '4px' : '0px'
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
