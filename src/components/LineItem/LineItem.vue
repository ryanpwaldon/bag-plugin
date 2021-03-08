<template>
  <component
    :is="editMode ? 'a' : 'button'"
    v-bind="editMode ? { href: link, target: '_parent' } : {}"
    class="flex flex-shrink-0 w-full overflow-hidden bg-white rounded shadow focus-visible:outline-none whitespace-nowrap focus-visible:ring-2 focus-visible:ring-blue-500 group focus:outline-none"
  >
    <div class="flex-shrink-0 w-24 h-24 bg-center bg-cover" :style="{ backgroundImage: `url(${resizeImage(image, 200)})` }" />
    <div class="flex self-center justify-between w-full px-4 overflow-hidden text-xs leading-4 text-gray-500">
      <div class="relative flex flex-col w-full space-y-1 overflow-hidden text-left">
        <p class="text-sm font-medium leading-5 text-gray-900 transition duration-150 ease-in-out group-hover:text-gray-500">
          {{ title }}
        </p>
        <p v-if="!hideOptions && options.length">
          <span v-for="({ name, value }, i) of options" :key="i">
            {{ name }}: {{ value }}
            <span v-if="options && i !== options.length - 1"> · </span>
          </span>
        </p>
        <p>
          {{ $copy.quantity }}: {{ quantity }} · <span class="text-blue-700">{{ editMode ? $copy.viewItem : $copy.edit }}</span>
        </p>
      </div>
      <div class="relative flex flex-col items-end pl-4 text-right">
        <GradientSpacer />
        <p class="text-sm font-medium leading-5 text-gray-900 transition duration-150 ease-in-out group-hover:text-gray-500">
          {{ price }}
        </p>
        <p v-if="false" class="line-through">{{ compareAtPrice }}</p>
      </div>
    </div>
  </component>
</template>

<script lang="ts">
import getParentOrigin from '@/utils/getParentOrigin'
import useResizeImage from '@/composables/useResizeImage'
import { defineComponent, PropType, computed } from 'vue'
import GradientSpacer from '../GradientSpacer/GradientSpacer.vue'

interface Option {
  name: string
  value: string
}

export default defineComponent({
  components: {
    GradientSpacer
  },
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
    editMode: {
      type: Boolean,
      default: false
    },
    relativeLink: {
      type: String,
      required: false
    }
  },
  setup(props) {
    const resizeImage = useResizeImage()
    const parentOrigin = getParentOrigin()
    const link = computed(() => `${parentOrigin}${props.relativeLink}`)
    return { link, resizeImage }
  }
})
</script>
