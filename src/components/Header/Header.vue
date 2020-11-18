<template>
  <div class="flex items-center justify-between flex-shrink-0 p-5 border-b select-none border-true-gray-200">
    <div class="text-lg font-medium leading-6 text-true-gray-700">{{ title }}</div>
    <transition enter-from-class="opacity-0" enter-to-class="opacity-100">
      <div v-if="meta" class="ml-auto mr-4 text-sm leading-5 transition duration-150 ease-in-out text-true-gray-500">{{ meta }}</div>
    </transition>
    <button
      type="button"
      @click="handleClose"
      class="inline-flex items-center justify-center w-8 h-8 -m-2 transition duration-150 ease-in-out bg-transparent rounded-full text-true-gray-400 hover:text-true-gray-500 focus:outline-none hover:bg-true-gray-200 focus:bg-true-gray-200 focus:text-true-gray-500"
    >
      <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { parentFrame } from '@/services/parent-frame/parent-frame'
export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    meta: {
      type: String,
      required: false
    },
    close: {
      type: Function,
      required: false
    }
  },
  methods: {
    async handleClose() {
      if (this.close) return this.close()
      const { triggerStateChange } = await parentFrame
      triggerStateChange('close')
    }
  }
})
</script>
