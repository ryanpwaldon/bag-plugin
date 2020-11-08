import { Ref, ref } from 'vue'
import crossSellService, { CrossSell } from '@/services/api/services/crossSellService'

const crossSells: Ref<CrossSell[]> = ref([])
const fetchCrossSells = async () => {
  if (crossSells.value.length) return crossSells.value
  crossSells.value = await crossSellService.findAll()
  console.log(crossSells.value)
  return crossSells.value
}

export default () => {
  fetchCrossSells()
  return { crossSells, fetchCrossSells }
}
