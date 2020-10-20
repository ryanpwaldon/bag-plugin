<template>
  <component
    :is="editMode ? 'div' : 'button'"
    class="flex flex-shrink-0 overflow-hidden whitespace-no-wrap transition duration-150 ease-in-out bg-white border border-transparent rounded-lg shadow focus:border-blue-300 focus:shadow-outline-blue focus:outline-none group"
  >
    <div class="flex-shrink-0 w-24 h-24 bg-center bg-cover" :style="{ backgroundImage: `url(${image})` }" />
    <div class="flex self-center justify-between w-full p-4 overflow-hidden text-xs leading-4 text-gray-500">
      <div class="relative flex flex-col w-full overflow-hidden text-left">
        <p class="text-sm font-medium leading-5 text-gray-900">{{ title }}</p>
        <p v-if="options">
          <span v-for="({ name, value }, i) of options" :key="i">
            {{ name }}: {{ value }}
            <span v-if="options && i !== options.length - 1"> · </span>
          </span>
        </p>
        <p>
          Quantity: {{ quantity }}
          <template v-if="!editMode"> · <span class="text-blue-700">Edit</span> </template>
        </p>
      </div>
      <div class="relative flex flex-col items-end pl-4 text-right">
        <GradientSpacer />
        <p class="text-sm font-medium leading-5 text-gray-900">{{ price }}</p>
        <p class="line-through">{{ originalPrice }}</p>
      </div>
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
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
      required: true
    },
    originalPrice: {
      type: [String, Number],
      required: false
    },
    options: {
      type: Array as PropType<Option[]>,
      defualt: () => []
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
    }
  }
})
</script>
