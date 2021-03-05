import { Ref, ref } from 'vue'
import rewardService, { Reward } from '@/services/api/services/rewardService'

const rewards: Ref<Reward[]> = ref([])
const fetchRewards = async () => {
  if (rewards.value.length) return rewards.value
  rewards.value = await rewardService.findAll()
  return rewards.value
}

export default () => {
  return { rewards, fetchRewards }
}
