<template>
  <div class="relative flex items-center justify-between text-base font-medium leading-6 text-true-gray-900">
    <p>Subtotal</p>
    <transition
      enter-active-class="transition duration-150 ease-in-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <p v-if="subtotal">{{ subtotal }}</p>
      <div v-else class="absolute right-0 w-20 h-4 transform -translate-y-1/2 top-1/2">
        <div class="w-full h-full bg-true-gray-200 rounded-full animate-pulse" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    subtotal: {
      type: String,
      required: false
    }
  }
})
</script>
