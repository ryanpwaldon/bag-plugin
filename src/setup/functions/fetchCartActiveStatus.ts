import cartService from '@/services/api/services/cartService'

export default async () => {
  const cart = await cartService.findOne()
  if (cart.active) console.log('Cart is active.')
  else console.log('Cart is not active.')
  return cart.active
}
