<template>
  <button
    v-if="product"
    class="relative flex flex-shrink-0 overflow-hidden whitespace-no-wrap transition duration-150 ease-in-out bg-white border border-transparent rounded-lg shadow focus:border-blue-300 focus:shadow-outline-blue focus:outline-none group"
  >
    <div class="flex-shrink-0 w-24 h-24 bg-center bg-cover" :style="{ backgroundImage: `url(${product.image})` }" />
    <div class="flex self-center justify-between w-full p-4 overflow-hidden">
      <div class="relative flex flex-col w-full overflow-hidden text-left">
        <p class="text-sm font-medium leading-5 text-gray-900 transition duration-150 ease-in-out group-hover:text-gray-500">{{ offer.title }}</p>
        <p class="text-xs leading-4 text-gray-500">{{ offer.subtitle }}</p>
      </div>
      <div class="relative flex items-center pl-4 transition duration-150 ease-in-out">
        <GradientSpacer />
        <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </button>
</template>

<script lang="ts">
import { Cart } from '@/types/shopify'
import { defineComponent, PropType } from 'vue'
import { Offer } from '@/services/api/services/offerService'
import GradientSpacer from '../GradientSpacer/GradientSpacer.vue'
import useProduct from '@/composables/useProduct'
export default defineComponent({
  components: {
    GradientSpacer
  },
  props: {
    offer: {
      type: Object as PropType<Offer>,
      required: true
    },
    cart: {
      type: Object as PropType<Cart>,
      required: true
    }
  },
  setup(props) {
    const { product } = useProduct(props.offer.productId)
    return { product }
  }
})
</script>
