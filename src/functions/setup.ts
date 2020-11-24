import useCrossSells from '@/composables/useCrossSells'
import cartService from '@/services/api/services/cartService'

export default async () => {
  const cart = await cartService.findOne()
  if (!cart.active) return
  const { fetchCrossSells } = useCrossSells()
  fetchCrossSells()
}
