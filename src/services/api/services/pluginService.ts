import api from '@/services/api/api'

export default {
  async findSettings() {
    return (await api({ url: `/plugin`, method: 'get' })).data
  }
}
