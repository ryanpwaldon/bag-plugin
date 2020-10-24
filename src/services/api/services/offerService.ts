import api from '@/services/api/api'

export enum OfferType {
  MinimumSpend = 'minimumSpend',
  ProductAddOn = 'productAddOn',
  ProductUpgrade = 'productUpgrade'
}

interface Offer {
  user: string
  type: OfferType
  active: boolean
  activeFor: number
  discountId: string
  title: string
  subtitle: string
  triggers: string[]
  productId: string
}

export default {
  async findActiveOffers(): Promise<Offer> {
    const params = { active: true }
    return (await api({ url: `/offer`, method: 'get', params })).data
  }
}
