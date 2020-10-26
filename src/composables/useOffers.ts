import { Ref, ref } from 'vue'
import offerService, { Offer } from '@/services/api/services/offerService'

const offers: Ref<Offer[]> = ref([])
const fetchOffers = async () => {
  if (offers.value.length) return offers.value
  offers.value = await offerService.findAll()
  return offers.value
}

export default () => {
  fetchOffers()
  return { offers, fetchOffers }
}
