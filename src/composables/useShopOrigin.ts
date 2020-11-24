export default () => {
  const shopOrigin = new URLSearchParams(window.location.search).get('shopOrigin')
  if (!shopOrigin) throw new Error('Invalid shopOrigin.')
  return shopOrigin
}
