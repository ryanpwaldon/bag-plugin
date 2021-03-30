export default (): number | undefined => {
  const navigationStart = new URLSearchParams(window.location.search).get('navigationStart')
  return navigationStart ? parseInt(navigationStart) : undefined
}
