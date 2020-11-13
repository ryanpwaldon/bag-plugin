<template>
  <div class="relative flex justify-center w-full">
    <div class="absolute w-full h-px transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 left-1/2 top-1/2" />
    <Badge :text="text" theme="white" class="z-10" />
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
