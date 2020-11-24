export default () => {
  const parentOrigin = new URLSearchParams(window.location.search).get('parentOrigin')
  if (!parentOrigin) throw new Error('Invalid parentOrigin.')
  return parentOrigin
}
