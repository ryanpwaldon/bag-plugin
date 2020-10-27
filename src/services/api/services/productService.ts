import api from '@/services/api/api'
import { Variant } from '@/types/shopify'

export interface ServerProduct {
  image: string
  title: string
  variants: Variant[]
  hasOnlyDefaultVariant: boolean
}

export default {
  async findOne(id: string | number): Promise<ServerProduct> {
    return (await api({ url: `/product/one`, method: 'get', params: { id } })).data
  }
}
