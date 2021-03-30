import getNavigationStart from '@/utils/getNavigationStart'

export default () => {
  const navigationStart = getNavigationStart()
  return navigationStart ? new Date().getTime() - navigationStart : undefined
}
