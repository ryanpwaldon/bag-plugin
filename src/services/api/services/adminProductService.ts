import api from '@/services/api/api'
import { ServerProduct } from '@/types/serverApi'
import { parseGid } from '@shopify/admin-graphql-api-utilities'

export default {
  async findOne(id: string): Promise<ServerProduct> {
    return (await api({ url: `/admin-product/${parseGid(id)}`, method: 'get' })).data
  }
}
