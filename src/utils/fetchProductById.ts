import { getParentFrame, connectedToParentFrame } from '@/composables/useParentFrame'

export default async (id: string) => {
  await connectedToParentFrame
  return getParentFrame().getProductById(id)
}
