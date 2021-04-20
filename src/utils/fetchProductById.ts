import useParentFrame from '@/composables/useParentFrame'

export default async (id: string) => {
  const { parentFrame } = useParentFrame()
  return parentFrame.value.getProductById(id)
}
