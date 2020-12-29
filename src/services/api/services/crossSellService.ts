import api from '@/services/api/api'
import { AjaxProduct } from '@/types/ajaxApi'
import useParentFrame from '@/composables/useParentFrame'
import { parseGid } from '@shopify/admin-graphql-api-utilities'

export type CrossSell = {
  id: string
  user: string
  active: boolean
  activeFor: number
  title: string
  subtitle: string
  triggerProductIds: string[]
  productId: string
  product: AjaxProduct
  createdAt: Date
}

export default {
  async findAll(): Promise<CrossSell[]> {
    const params = { query: { active: true }, limit: Number.MAX_SAFE_INTEGER, populateProducts: false }
    const crossSells: CrossSell[] = (await api({ url: `/cross-sell`, method: 'get', params })).data.docs
    const { parentFrame } = useParentFrame()
    await Promise.all(crossSells.map(async crossSell => (crossSell.product = await parentFrame.value.getProductById(parseGid(crossSell.productId)))))
    return crossSells
  }
}
