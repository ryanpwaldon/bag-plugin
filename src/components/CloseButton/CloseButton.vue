<template>
  <button
    type="button"
    @click="close"
    class="inline-flex items-center justify-center w-8 h-8 -m-2 text-gray-400 transition duration-150 ease-in-out bg-transparent rounded-full hover:text-gray-500 focus:outline-none hover:bg-gray-200 focus:bg-gray-200 focus:text-gray-500"
  >
    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { comms } from '@/services/comms/comms'
export default defineComponent({
  methods: {
    async close() {
      const { triggerStateChange } = await comms
      triggerStateChange('close')
    }
  }
})
</script>
