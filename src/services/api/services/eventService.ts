import api from '@/services/api/api'

type CrossSellImpression = {
  cartToken: string
  crossSell: string
}

type ProgressBarImpression = {
  cartToken: string
  progressBar: string
}

export default {
  createCrossSellImpression(crossSellImpression: CrossSellImpression): void {
    api({ url: `/event/cross-sell-impression`, method: 'post', data: crossSellImpression })
  },

  createProgressBarImpression(progressBarImpression: ProgressBarImpression): void {
    api({ url: `/event/progress-bar-impression`, method: 'post', data: progressBarImpression })
  }
}
