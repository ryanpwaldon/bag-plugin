<template>
  <component
    :is="editMode ? 'a' : 'button'"
    v-bind="editMode ? { href: link, target: '_parent' } : {}"
    class="flex flex-shrink-0 w-full overflow-hidden bg-white rounded-lg shadow focus:outline-none whitespace-nowrap focus:ring-2 focus:ring-blue-500 group"
  >
    <div class="flex-shrink-0 w-24 h-24 bg-center bg-cover" :style="{ backgroundImage: `url(${image})` }" />
    <div class="flex self-center justify-between w-full p-4 overflow-hidden text-xs leading-4 text-gray-500">
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
          Quantity: {{ quantity }} · <span class="text-blue-700">{{ editMode ? 'View item' : 'Edit' }}</span>
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
import GradientSpacer from '../GradientSpacer/GradientSpacer.vue'
import { defineComponent, PropType, computed } from 'vue'
import useParentOrigin from '@/composables/useParentOrigin'

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
    const parentOrigin = useParentOrigin()
    const link = computed(() => `${parentOrigin}${props.relativeLink}`)
    return { link }
  }
})
</script>
