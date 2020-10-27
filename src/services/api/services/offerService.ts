import api from '@/services/api/api'
import { ServerOffer } from '@/types/serverApi'

export default {
  async findAll(): Promise<ServerOffer[]> {
    const params = {
      query: { active: true },
      limit: Number.MAX_SAFE_INTEGER
    }
    return (await api({ url: `/offer`, method: 'get', params })).data.docs
  }
}
