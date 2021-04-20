<template>
  <div class="flex flex-shrink-0 w-full overflow-hidden bg-white rounded shadow whitespace-nowrap">
    <EmptyBag class="flex-shrink-0 w-24 h-24" />
    <div class="flex flex-col justify-center w-full px-4">
      <p class="text-sm font-medium text-gray-900">{{ $copy.emptyCartLine1 }}</p>
      <p class="mt-1 text-xs text-gray-500">{{ $copy.emptyCartLine2 }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import EmptyBag from '@/icons/EmptyBag.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    EmptyBag
  }
})
</script>
