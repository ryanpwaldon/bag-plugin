import api from '@/services/api/api'

type CrossSellImpression = {
  cartToken: string
  crossSell: string
}

export default {
  createCrossSellImpression(crossSellImpression: CrossSellImpression): void {
    api({ url: `/event/cross-sell-impression`, method: 'post', data: crossSellImpression })
  }
}
