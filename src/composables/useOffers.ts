import { Ref, ref } from 'vue'
import { Offer } from '@/types/serverApi'
import fetchProductById from '@/utils/fetchProductById'
import { parseGid } from '@shopify/admin-graphql-api-utilities'
import pluginService from '@/services/api/services/pluginService'

const loaded = ref(false)
const offers: Ref<Offer[]> = ref([])

const fetchOffers = async () => {
  try {
    const { crossSells, progressBars } = await pluginService.findOffers()
    await Promise.all(crossSells.map(async crossSell => (crossSell.product = await fetchProductById(parseGid(crossSell.productId)))))
    offers.value = [...crossSells, ...progressBars]
  } catch (err) {
    console.log(err)
  }
  loaded.value = true
}

export default () => {
  return { offers, fetchOffers, loaded }
}
