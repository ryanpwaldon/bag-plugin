import api from '@/services/api/api'
import { ServerProduct } from '@/types/serverApi'

export default {
  async findOne(id: string | number): Promise<ServerProduct> {
    return (await api({ url: `/product/one`, method: 'get', params: { id } })).data
  }
}
