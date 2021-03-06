import useParentFrame from '@/composables/useParentFrame'
import api from '@/services/api/api'
import { CrossSell } from '@/services/api/services/crossSellService'
import { ProgressBar } from '@/services/api/services/progressBarService'

export interface Offers {
  crossSells: CrossSell[]
  progressBars: ProgressBar[]
}

const attachProductsToCrossSells = async (crossSells: CrossSell[]): Promise<CrossSell[]> => {
  const { parentFrame } = useParentFrame()
  await Promise.all(crossSells.map(async crossSell => (crossSell.product = await parentFrame.value.getProductById(crossSell.productId))))
  return crossSells
}

export default {
  async findOffers(): Promise<Offers> {
    const { crossSells, progressBars } = (await api({ url: `/plugin/offers`, method: 'get' })).data
    return {
      crossSells: await attachProductsToCrossSells(crossSells),
      progressBars
    }
  }
}
