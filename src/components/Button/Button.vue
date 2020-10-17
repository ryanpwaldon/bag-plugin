<template>
  <span class="inline-flex rounded-md shadow select-none" :class="[loading && 'cursor-not-allowed pointer-events-none']">
    <button
      :type="type"
      :class="[classes]"
      class="inline-flex items-center justify-center w-full transition duration-150 ease-in-out border focus:outline-none"
    >
      <Spinner v-if="loading" class="w-4 h-4 mr-1 -ml-1" />
      <template v-else>{{ text }}</template>
    </button>
  </span>
</template>

<script lang="ts">
import Spinner from '@/components/Spinner/Spinner.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    Spinner
  },
  props: {
    text: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'button'
    },
    size: {
      type: String,
      default: 'lg'
    },
    theme: {
      type: String,
      default: 'black'
    },
    loading: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    // prettier-ignore
    classes(): string {
      const sizeClasses = ({
        xs: 'rounded px-2.5 py-1.5 text-xs font-medium leading-4',
        sm: 'rounded-md px-3 py-2 text-sm font-medium leading-4',
        md: 'rounded-md px-4 py-2 text-sm font-medium leading-5',
        lg: 'rounded-md px-4 py-2 text-base font-medium leading-6',
        xl: 'rounded-md px-6 py-3 text-base font-medium leading-6'
      } as { [key: string]: string })[this.size]
      const themeClasses = ({
        white: 'text-gray-700 bg-white border-transparent hover:text-gray-500 focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50',
        black: 'text-white border-transparent focus:shadow-outline-gray bg-gray-900 hover:bg-gray-800 active:bg-gray-700',
      } as { [key: string]: string })[this.theme]
      return `${sizeClasses} ${themeClasses}`
    }
  }
})
</script>
