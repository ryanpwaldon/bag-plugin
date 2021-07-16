import api from '@/services/api/api'

type CrossSellClick = {
  cartToken: string
  crossSell: string
}

export default {
  createCrossSellClick(crossSellClick: CrossSellClick): void {
    api({ url: `/event/cross-sell-click`, method: 'post', data: crossSellClick })
  }
}
