<template>
  <button
    type="button"
    class="flex flex-shrink-0 w-full overflow-hidden bg-white rounded shadow focus-visible:outline-none whitespace-nowrap focus-visible:ring-2 focus-visible:ring-blue-500 group focus:outline-none xs:min-h-24 min-h-22"
  >
    <div class="self-stretch flex-shrink-0 bg-center bg-cover w-22 xs:w-24" :style="{ backgroundImage: `url(${resizeImage(image, 400)})` }" />
    <div class="flex self-center justify-between w-full p-3 overflow-hidden text-xs leading-4 text-gray-500">
      <div class="relative flex flex-col w-full space-y-1 overflow-hidden text-left">
        <p class="text-sm font-medium leading-5 text-gray-900 truncate transition duration-150 ease-in-out group-hover:text-gray-500">
          {{ title }}
        </p>
        <p class="truncate" v-if="!hideOptions && options.length">
          <span v-for="({ name, value }, i) of options" :key="i">
            {{ name }}: {{ value }}
            <span v-if="options && i !== options.length - 1"> · </span>
          </span>
        </p>
        <p class="truncate">
          {{ $copy.quantity }}: {{ quantity }} · <span class="text-blue-700">{{ linkCopy }}</span>
        </p>
      </div>
      <div class="relative flex flex-col items-end pl-4 text-right">
        <p class="text-sm font-medium leading-5 text-gray-900 transition duration-150 ease-in-out group-hover:text-gray-500">
          {{ price }}
        </p>
        <p v-if="false" class="line-through">{{ compareAtPrice }}</p>
      </div>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import useResizeImage from '@/composables/useResizeImage'

interface Option {
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
      type: [String, Number],
      required: false
    },
    compareAtPrice: {
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
