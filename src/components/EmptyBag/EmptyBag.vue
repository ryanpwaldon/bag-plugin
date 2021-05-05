<template>
  <div class="flex items-stretch w-full overflow-hidden bg-white rounded shadow whitespace-nowrap xs:min-h-24 min-h-22">
    <div class="flex-shrink-0 w-22 xs:w-24">
      <EmptyBag class="w-full" />
    </div>
    <div class="flex flex-col items-start justify-center w-full px-4 overflow-hidden">
      <p class="text-sm font-medium text-gray-900 truncate">{{ $copy.emptyCartLine1 }}</p>
      <p class="mt-1 text-xs text-gray-500 truncate">{{ $copy.emptyCartLine2 }}</p>
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
