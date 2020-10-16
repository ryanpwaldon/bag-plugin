<template>
  <div class="relative w-full">
    <div class="w-full h-px bg-gray-200" />
    <Badge :text="text" theme="gray" class="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Badge from '../Badge/Badge.vue'
export default defineComponent({
  components: {
    Badge
  },
  props: {
    text: {
      type: String,
      required: true
    }
  }
})
</script>
