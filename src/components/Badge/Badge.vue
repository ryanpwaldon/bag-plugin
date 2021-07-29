<template>
  <span
    class="inline-flex items-center select-none bg-themeColor2 filter brightness-brightness2 text-textColor1 px-2.5 py-0.5 rounded-roundness1 text-xs font-medium"
  >
    {{ text }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    text: {
      type: String,
      required: true
    }
  }
})
</script>
