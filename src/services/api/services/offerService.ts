import api from '@/services/api/api'

export enum OfferType {
  MinimumSpend = 'minimumSpend',
  ProductAddOn = 'productAddOn',
  ProductUpgrade = 'productUpgrade'
}

export interface Offer {
  id: string
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
  async findAll(): Promise<Offer[]> {
    const params = {
      query: { active: true },
      limit: Number.MAX_SAFE_INTEGER
    }
    return (await api({ url: `/offer`, method: 'get', params })).data.docs
  }
}
