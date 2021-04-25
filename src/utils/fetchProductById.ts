import { getParentFrame } from '@/composables/useParentFrame'

export default async (id: string) => {
  return getParentFrame().getProductById(id)
}
