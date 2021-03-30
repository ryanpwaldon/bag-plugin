import { Ref, ref } from 'vue'
import { CrossSell, ProgressBar } from '@/types/serverApi'
import pluginService from '@/services/api/services/pluginService'

const crossSells: Ref<CrossSell[]> = ref([])
const progressBars: Ref<ProgressBar[]> = ref([])
const loaded = ref(false)

const fetchOffers = async () => {
  try {
    const offers = await pluginService.findOffers()
    crossSells.value = offers.crossSells
    progressBars.value = offers.progressBars
  } catch (err) {
    console.log(err)
    crossSells.value = []
    progressBars.value = []
  }
  loaded.value = true
}

export default () => {
  return { crossSells, progressBars, fetchOffers, loaded }
}
