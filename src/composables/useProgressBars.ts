import { Ref, ref } from 'vue'
import progressBarService, { ProgressBar } from '@/services/api/services/progressBarService'

const progressBars: Ref<ProgressBar[]> = ref([])
const fetchProgressBars = async () => {
  if (progressBars.value.length) return progressBars.value
  progressBars.value = await progressBarService.findAll()
  return progressBars.value
}

export default () => {
  return { progressBars, fetchProgressBars }
}
