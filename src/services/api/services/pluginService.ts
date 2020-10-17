import api from '@/services/api/api'

export default {
  async findOne() {
    return (await api({ url: `/plugin`, method: 'get' })).data
  }
}
