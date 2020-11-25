import useCrossSells from '@/composables/useCrossSells'
import cartService from '@/services/api/services/cartService'

export default async (): Promise<boolean> => {
  const { active } = await cartService.findOne()
  if (active) {
    console.log('Cart is enabled.')
    const { fetchCrossSells } = useCrossSells()
    fetchCrossSells()
  } else {
    console.log('Cart is disabled.')
  }
  return active
}
