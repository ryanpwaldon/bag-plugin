import api from '@/services/api/api'
import { CrossSell, ProgressBar } from '@/types/serverApi'

export default {
  async findOffers(): Promise<{ crossSells: CrossSell[]; progressBars: ProgressBar[] }> {
    return (await api({ url: `/plugin/offers`, method: 'get' })).data
  }
}
