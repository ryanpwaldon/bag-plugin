export default () => new URLSearchParams(window.location.search).get('debug') === 'true'
