const defaultLocale = 'en'
export default () => new URLSearchParams(window.location.search).get('locale') || defaultLocale
