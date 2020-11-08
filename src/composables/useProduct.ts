import { ref, Ref } from 'vue'
import { ServerProduct } from '@/types/serverApi'
import adminProductService from '@/services/api/services/adminProductService'

const products: Ref<Record<string, ServerProduct>> = ref({})

const fetchProduct = async (id: string) => {
  if (products.value[id]) return products.value[id]
  products.value[id] = await adminProductService.findOne(id)
  return products.value[id]
}

export default () => {
  return { fetchProduct }
}
