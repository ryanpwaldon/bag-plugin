import fetchCartActiveStatus from '@/setup/functions/fetchCartActiveStatus'

export default async (): Promise<boolean> => {
  const active = await fetchCartActiveStatus()
  if (!active) return false
  return true
}
