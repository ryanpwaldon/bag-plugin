import { ref, Ref } from 'vue'
import { ServerProduct } from '@/types/serverApi'
import productService from '@/services/api/services/productService'

const products: Ref<Record<string, ServerProduct>> = ref({})

const fetchProduct = async (id: string) => {
  if (products.value[id]) return products.value[id]
  products.value[id] = await productService.findOne(id)
  return products.value[id]
}

export default () => {
  return { fetchProduct }
}
