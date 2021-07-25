<template>
  <span class="inline-flex items-center select-none" :class="[classes]">
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
    },
    size: {
      type: String,
      default: 'small'
    },
    theme: {
      type: String,
      default: 'gray'
    }
  },
  computed: {
    classes(): string {
      const sizeClasses = ({
        small: 'px-2.5 py-0.5 rounded-full text-xs font-medium'
      } as { [key: string]: string })[this.size]
      const themeClasses = ({
        white: 'bg-white text-colorTextPrimary',
        gray: 'bg-gray-100 text-colorTextPrimary'
      } as { [key: string]: string })[this.theme]
      return `${sizeClasses} ${themeClasses}`
    }
  }
})
</script>
