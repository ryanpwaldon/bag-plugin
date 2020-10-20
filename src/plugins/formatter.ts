import { App } from 'vue'

const getLocale = () => (navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language)
const currency = (amount: number, currencyCode: string) => {
  return new Intl.NumberFormat(getLocale(), {
    style: 'currency',
    currency: currencyCode
  }).format(amount / 100)
}

export default {
  install: (app: App) => {
    app.config.globalProperties.$formatter = {
      currency
    }
  }
}
