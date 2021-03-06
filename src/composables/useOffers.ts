import { Ref, ref } from 'vue'
import pluginService from '@/services/api/services/pluginService'
import { CrossSell } from '@/services/api/services/crossSellService'
import { ProgressBar } from '@/services/api/services/progressBarService'

const crossSells: Ref<CrossSell[]> = ref([])
const progressBars: Ref<ProgressBar[]> = ref([])

const fetchOffers = async () => {
  const offers = await pluginService.findOffers()
  crossSells.value = offers.crossSells
  progressBars.value = offers.progressBars
}

export default () => {
  return { crossSells, progressBars, fetchOffers }
}
