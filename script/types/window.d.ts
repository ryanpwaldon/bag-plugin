import defaultCartSettings from '@/settings/defaultCartSettings'

export declare global {
  interface Window {
    Shopify: {
      shop: string
      locale: string
    }
    bagCartSettings: typeof defaultCartSettings
  }
}
