<template>
  <div class="relative flex items-center justify-between text-base font-medium leading-6 text-gray-900 pointer-events-none">
    <p>{{ $copy.subtotal }}</p>
    <transition
      enter-active-class="transition duration-150 ease-in-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="subtotal" class="flex space-x-3">
        <p v-if="displayOriginalSubtotal" class="font-normal text-gray-500 line-through">{{ originalSubtotal }}</p>
        <p>{{ subtotal }}</p>
      </div>
      <div v-else class="absolute right-0 w-20 h-4 transform -translate-y-1/2 top-1/2">
        <div class="w-full h-full bg-gray-200 animate-pulse" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    displayOriginalSubtotal: {
      type: Boolean,
      required: false
    },
    originalSubtotal: {
      type: String,
      required: false
    },
    subtotal: {
      type: String,
      required: false
    }
  }
})
</script>
