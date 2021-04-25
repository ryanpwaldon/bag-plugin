import { getParentFrame } from '@/composables/useParentFrame'

export default async (handle: string) => {
  return getParentFrame().getProductByHandle(handle)
}
