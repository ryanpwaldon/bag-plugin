<template>
  <div class="flex items-center justify-between flex-shrink-0 p-5 border-b border-dashed select-none border-colorBorderPrimary xs:p-6">
    <div class="text-lg font-medium leading-6">{{ title }}</div>
    <transition enter-from-class="opacity-0" enter-to-class="opacity-100">
      <div v-if="meta" class="ml-auto mr-4 text-sm leading-5 transition duration-150 ease-in-out text-colorTextSecondary">{{ meta }}</div>
    </transition>
    <button
      type="button"
      @click="handleClose"
      class="inline-flex items-center justify-center w-12 h-12 -m-4 transition ease-out rounded text-colorTextSecondary hover:opacity-90 focus:outline-none focus:opacity-90"
    >
      <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { getParentFrame } from '@/composables/useParentFrame'
import { defineComponent } from 'vue'
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
      getParentFrame().close()
    }
  }
})
</script>
