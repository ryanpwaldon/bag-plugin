import api from '@/services/api/api'

export interface Product {
  image: string
  title: string
}

export default {
  async findOne(id: string): Promise<Product> {
    return (await api({ url: `/product/one`, method: 'get', params: { id } })).data
  }
}
