const defaultLocale = 'en'
const supportedLocales = ['en', 'fr', 'el', 'nb', 'de', 'da', 'pt-PT']
export default () => {
  const locale = new URLSearchParams(window.location.search).get('locale')
  if (!locale || !supportedLocales.includes(locale)) return defaultLocale
  return locale
}
