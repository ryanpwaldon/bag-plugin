<template>
  <Card :image="require('@/assets/img/empty-bag.svg')">
    <div class="flex flex-col items-start justify-center w-full px-4 overflow-hidden">
      <p class="text-sm font-medium text-gray-900 truncate">{{ $copy.emptyCartLine1 }}</p>
      <p class="mt-1 text-xs text-gray-500 truncate">{{ $copy.emptyCartLine2 }}</p>
    </div>
  </Card>
</template>

<script lang="ts">
import Card from '@/components/Card/Card.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: { Card }
})
</script>
