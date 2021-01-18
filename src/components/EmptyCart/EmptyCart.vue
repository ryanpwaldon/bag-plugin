<template>
  <div class="flex flex-shrink-0 overflow-hidden whitespace-no-wrap bg-white border rounded-lg shadow-sm border-gray-200">
    <div class="flex items-center flex-shrink-0 h-24 px-4">
      <Cart class="h-16 text-gray-900" />
    </div>
    <div class="flex flex-col items-start justify-center w-full p-4 pl-0 overflow-hidden">
      <p class="text-sm font-medium leading-5 text-gray-900">Your cart is empty</p>
      <p class="mt-1 text-xs leading-4 text-gray-500">Add some items to check out</p>
    </div>
  </div>
</template>

<script lang="ts">
import Cart from '@/icons/Cart.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: { Cart }
})
</script>
