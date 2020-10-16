<template>
  <div class="flex items-center justify-between text-base font-medium leading-6 text-gray-900">
    <p>Subtotal</p>
    <p>{{ subtotal }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    subtotal: {
      type: String,
      required: true
    }
  }
})
</script>
