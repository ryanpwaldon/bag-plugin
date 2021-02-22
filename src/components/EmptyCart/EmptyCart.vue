<template>
  <div class="flex flex-shrink-0 overflow-hidden bg-white shadow whitespace-nowrap">
    <div class="flex items-center flex-shrink-0 h-24 px-4">
      <Cart class="h-16 text-gray-900" />
    </div>
    <div class="flex flex-col items-start justify-center w-full p-4 pl-0 overflow-hidden">
      <p class="text-sm font-medium leading-5 text-gray-900">{{ $copy.emptyCartLine1 }}</p>
      <p class="mt-1 text-xs leading-4 text-gray-500">{{ $copy.emptyCartLine2 }}</p>
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
