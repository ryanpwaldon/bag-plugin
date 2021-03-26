const defaultLocale = 'en'
const supportedLocales = ['en', 'fr', 'el']
export default () => {
  const locale = new URLSearchParams(window.location.search).get('locale')
  if (!locale || !supportedLocales.includes(locale)) return defaultLocale
  return locale
}
