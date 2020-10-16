<template>
  <div class="flex flex-shrink-0 overflow-hidden whitespace-no-wrap bg-white rounded-lg shadow">
    <div class="flex-shrink-0 w-24 h-24 bg-center bg-cover" :style="{ backgroundImage: `url(${image})` }" />
    <div class="flex self-center justify-between w-full p-4 space-x-4 overflow-hidden text-xs leading-4 text-gray-500">
      <div class="relative flex flex-col w-full overflow-hidden text-left">
        <div class="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-white" />
        <p class="text-sm font-medium leading-5 text-gray-900">{{ title }}</p>
        <p v-if="variants">
          <span v-for="({ name, value }, i) of variants" :key="i">
            {{ name }}: {{ value }}
            <span v-if="variants && i !== variants.length - 1"> · </span>
          </span>
        </p>
        <p>Quantity: {{ quantity }} · Edit</p>
      </div>
      <div class="flex flex-col items-end text-right">
        <p class="text-sm font-medium leading-5 text-gray-900">{{ price }}</p>
        <p class="line-through">{{ originalPrice }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Variant {
  name: string
  value: string
}

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    originalPrice: {
      type: String,
      required: false
    },
    variants: {
      type: Array as PropType<Variant[]>,
      defualt: () => []
    },
    quantity: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }
})
</script>
