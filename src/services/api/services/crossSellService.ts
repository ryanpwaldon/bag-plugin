import api from '@/services/api/api'

export type CrossSell = {
  id: string
  user: string
  active: boolean
  activeFor: number
  title: string
  subtitle: string
  triggerProductIds: string[]
  productId: string
  product: any
  createdAt: Date
}

export default {
  async findAll(): Promise<CrossSell[]> {
    const params = {
      query: { active: true },
      limit: Number.MAX_SAFE_INTEGER
    }
    return (await api({ url: `/cross-sell`, method: 'get', params })).data.docs
  }
}
