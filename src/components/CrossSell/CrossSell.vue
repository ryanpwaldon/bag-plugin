<template>
  <button
    class="relative flex flex-shrink-0 w-full overflow-hidden bg-white rounded shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none group xs:min-h-24 min-h-22"
  >
    <div
      class="self-stretch flex-shrink-0 bg-center bg-cover rounded-l w-22 xs:w-24"
      :style="{ backgroundImage: `url(${resizeImage(image, 400)})` }"
    />
    <div class="flex self-center justify-between w-full p-3 overflow-hidden">
      <div class="relative flex flex-col w-full space-y-1 overflow-hidden text-left">
        <p
          class="text-sm font-medium leading-5 text-gray-900 transition duration-150 ease-in-out group-hover:text-gray-500"
          style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;"
        >
          {{ title }}
        </p>
        <p
          class="text-xs leading-4 text-gray-500"
          style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;"
        >
          {{ subtitle }}
        </p>
      </div>
      <div class="relative flex items-center pl-4 transition duration-150 ease-in-out">
        <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useResizeImage from '@/composables/useResizeImage'
import eventService from '@/services/api/services/eventService'
export default defineComponent({
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    cartToken: {
      type: String,
      required: true
    },
    productId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const resizeImage = useResizeImage()
    eventService.createCrossSellImpression({
      cartToken: props.cartToken,
      crossSell: props.id
    })
    return { resizeImage }
  }
})
</script>
