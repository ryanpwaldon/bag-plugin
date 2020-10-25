import productService, { Product } from '@/services/api/services/productService'
import { computed, Ref, ref } from 'vue'

const products: Ref<Record<string, Product>> = ref({})

export default (id: string) => {
  const product = computed(() => products.value[id])
  const fetchProduct = async () => (products.value[id] = await productService.findOne(id))
  if (!product.value) fetchProduct()
  return { product }
}
