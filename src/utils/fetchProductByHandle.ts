import useParentFrame from '@/composables/useParentFrame'

export default async (handle: string) => {
  const { parentFrame } = useParentFrame()
  return parentFrame.value.getProductByHandle(handle)
}
