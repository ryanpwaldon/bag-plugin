<template>
  <button
    class="relative flex flex-shrink-0 overflow-hidden whitespace-no-wrap transition duration-150 ease-in-out bg-white border border-transparent rounded-lg shadow focus:border-blue-300 focus:shadow-outline-blue focus:outline-none group"
  >
    <div class="flex-shrink-0 w-24 h-24 bg-center bg-cover" :style="{ backgroundImage: `url(${image})` }" />
    <div class="flex self-center justify-between w-full p-4 overflow-hidden">
      <div class="relative flex flex-col w-full overflow-hidden text-left">
        <p class="text-sm font-medium leading-5 text-gray-900">{{ title }}</p>
        <p class="text-xs leading-4 text-gray-500">{{ subtitle }}</p>
      </div>
      <div class="relative flex items-center pl-4 transition duration-150 ease-in-out">
        <GradientSpacer />
        <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
    <div
      class="absolute top-0 right-0 grid content-center h-full gap-2 px-4 transition duration-150 ease-in-out bg-white opacity-0 pointer-events-none auto-rows-max focus-within:opacity-100 group-focus:opacity-100 group-focus:pointer-events-auto focus-within:pointer-events-auto"
    >
      <GradientSpacer />
      <Button size="xs" text="View item" theme="white" />
      <Button size="xs" text="Add to cart" theme="black" />
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from '../Button/Button.vue'
import GradientSpacer from '../GradientSpacer/GradientSpacer.vue'
export default defineComponent({
  components: {
    Button,
    GradientSpacer
  },
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    variantId: {
      type: String,
      required: false
    },
    variantUrl: {
      type: String,
      required: false
    },
    image: {
      type: String,
      required: true
    }
  }
})
</script>
