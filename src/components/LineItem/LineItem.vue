<template>
  <Card type="button" :image="resizeImage(image, 400)">
    <div class="flex self-center justify-between w-full p-3 overflow-hidden text-xs">
      <div class="relative flex flex-col w-full space-y-1 overflow-hidden text-left">
        <p class="text-sm font-medium truncate transition duration-150 ease-in-out">
          {{ title }}
        </p>
        <p class="truncate font-fontFamilySecondary text-colorTextSecondary" v-if="!hideOptions && options.length">
          <span v-for="({ name, value }, i) of options" :key="i">
            {{ name }}: {{ value }}
            <span v-if="options && i !== options.length - 1"> · </span>
          </span>
        </p>
        <p class="truncate font-fontFamilySecondary text-colorTextSecondary">
          {{ $copy.quantity }}: {{ quantity }} · <span class="text-colorTextLink">{{ linkCopy }}</span>
        </p>
      </div>
      <div class="relative flex flex-col items-end pl-4 text-right">
        <p class="text-sm font-medium leading-5 transition duration-150 ease-in-out">
          {{ price }}
        </p>
        <p v-if="displayOriginalPrice" class="mt-1 line-through">{{ originalPrice }}</p>
      </div>
    </div>
  </Card>
</template>

<script lang="ts">
import Card from '@/components/Card/Card.vue'
import { defineComponent, PropType } from 'vue'
import useResizeImage from '@/composables/useResizeImage'

export interface Option {
  name: string
  value: string
}

export default defineComponent({
  components: { Card },
  props: {
    title: {
      type: String,
      required: true
    },
    price: {
      type: [String, Number],
      required: false
    },
    displayOriginalPrice: {
      type: Boolean,
      default: false
    },
    originalPrice: {
      type: [String, Number],
      required: false
    },
    options: {
      type: Array as PropType<Option[]>,
      default: () => []
    },
    hideOptions: {
      type: Boolean,
      defualt: false
    },
    quantity: {
      type: [String, Number],
      required: true
    },
    image: {
      type: String,
      required: true
    },
    linkCopy: {
      type: String,
      required: true
    }
  },
  setup() {
    const resizeImage = useResizeImage()
    return { resizeImage }
  }
})
</script>
