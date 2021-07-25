<template>
  <div class="w-full overflow-hidden bg-white border rounded shadow-shadowPrimary group border-colorBorderPrimary">
    <component
      :is="type"
      v-bind="type === 'button' ? { type: 'button' } : {}"
      class="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
    >
      <div class="flex items-stretch w-full">
        <div class="flex-shrink-0 bg-center bg-cover rounded-l xs:min-h-24 min-h-22 w-22 xs:w-24" :style="{ backgroundImage: `url(${image})` }" />
        <slot />
      </div>
    </component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'div'
    },
    image: {
      type: String,
      required: true
    }
  }
})
</script>
