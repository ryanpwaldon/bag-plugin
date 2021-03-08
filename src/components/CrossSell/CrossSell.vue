<template>
  <button
    class="relative flex flex-shrink-0 w-full overflow-hidden bg-white rounded shadow whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none group"
  >
    <div class="flex-shrink-0 w-24 h-24 bg-center bg-cover" :style="{ backgroundImage: `url(${image})` }" />
    <div class="flex self-center justify-between w-full px-4 overflow-hidden">
      <div class="relative flex flex-col w-full space-y-1 overflow-hidden text-left">
        <p class="text-sm font-medium leading-5 text-gray-900 transition duration-150 ease-in-out group-hover:text-gray-500">{{ title }}</p>
        <p class="text-xs leading-4 text-gray-500">{{ subtitle }}</p>
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
import eventService from '@/services/api/services/eventService'
import { defineComponent } from 'vue'
import GradientSpacer from '../GradientSpacer/GradientSpacer.vue'
export default defineComponent({
  components: {
    GradientSpacer
  },
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
    eventService.createCrossSellImpression({
      cartToken: props.cartToken,
      crossSell: props.id
    })
  }
})
</script>
