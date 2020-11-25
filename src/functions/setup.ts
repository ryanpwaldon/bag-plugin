import useCrossSells from '@/composables/useCrossSells'
import cartService from '@/services/api/services/cartService'

export default async (): Promise<boolean> => {
  const { active } = await cartService.findOne()
  if (active) {
    const { fetchCrossSells } = useCrossSells()
    fetchCrossSells()
  } else {
    console.warn('Cart is disabled.')
  }
  return active
}
