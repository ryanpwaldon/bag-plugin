import api from '@/services/api/api'

export enum CartEventType {
  CrossSellImpression = 'crossSellImpression',
  DiscountImpression = 'discountImpression'
}

type CrossSellImpression = {
  type: CartEventType.CrossSellImpression
  meta: {
    crossSellId: string
    productId: string
  }
}

type CartEvent = { cartToken: string } & CrossSellImpression

export default {
  create(cartEvent: CartEvent): void {
    api({ url: `/cart-event`, method: 'post', data: cartEvent })
  }
}
