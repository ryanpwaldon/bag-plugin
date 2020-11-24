import api from '@/services/api/api'

interface Cart {
  active: boolean
}

export default {
  async findOne(): Promise<Cart> {
    return (await api({ url: `/cart`, method: 'get' })).data
  }
}
