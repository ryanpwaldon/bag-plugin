<template>
  <button type="button" class="flex items-center space-x-4 focus:outline-none">
    <div
      class="inline-flex items-center justify-center w-8 h-8 -m-2 text-true-gray-400 transition duration-150 ease-in-out bg-transparent rounded-full hover:text-true-gray-500 hover:bg-true-gray-200 focus:bg-true-gray-200 focus:text-true-gray-500"
    >
      <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </div>
    <div class="text-lg font-medium leading-6 text-true-gray-900">{{ text }}</div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    text: {
      type: String,
      required: true
    }
  }
})
</script>
