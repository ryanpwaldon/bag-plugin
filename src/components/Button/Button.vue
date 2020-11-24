<template>
  <span class="inline-flex rounded-md select-none" :class="[containerClasses, loading && 'cursor-not-allowed pointer-events-none']">
    <button
      :type="type"
      :class="[buttonClasses]"
      class="inline-flex items-center justify-center w-full transition duration-150 ease-in-out focus:outline-none"
    >
      <Spinner v-if="loading" class="w-4 h-4 mr-1 -ml-1" />
      <template v-else>{{ text }}</template>
    </button>
  </span>
</template>

<script lang="ts">
import Spinner from '@/components/Spinner/Spinner.vue'
import { defineComponent, PropType } from 'vue'

type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type Themes = 'whiteOutlined' | 'white' | 'black'
type Classes<T extends string> = { [K in T]: string }

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
      type: String as PropType<Sizes>,
      default: 'lg'
    },
    theme: {
      type: String as PropType<Themes>,
      default: 'black'
    },
    loading: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    // prettier-ignore
    containerClasses(): string {
      const sizeClasses: Classes<Sizes> = { xs: '', sm: '', md: '', lg: '', xl: '' }
      const themeClasses: Classes<Themes> = { whiteOutlined: 'shadow-sm', white: 'shadow', black: 'shadow' }
      return `${sizeClasses[this.size]} ${themeClasses[this.theme]}`
    },
    // prettier-ignore
    buttonClasses(): string {
      const sizeClasses: Classes<Sizes> = {
        xs: 'rounded px-2.5 py-1.5 text-xs font-medium leading-4',
        sm: 'rounded-md px-3 py-2 text-sm font-medium leading-4',
        md: 'rounded-md px-4 py-2 text-sm font-medium leading-5',
        lg: 'rounded-lg px-5 py-3 text-lg font-medium leading-6',
        xl: 'rounded-md px-6 py-3 text-base font-medium leading-6'
      }
      const themeClasses: Classes<Themes> = {
        whiteOutlined: 'border text-true-gray-700 bg-white border-true-gray-300 hover:text-true-gray-600 focus:border-blue-300 focus:shadow-outline-blue active:text-true-gray-800 active:bg-true-gray-50',
        white: 'border text-true-gray-700 bg-white border-transparent hover:text-true-gray-500 focus:border-blue-300 focus:shadow-outline-blue active:text-true-gray-800 active:bg-true-gray-50',
        black: 'text-white focus:shadow-outline-gray bg-true-gray-900 hover:bg-true-gray-800 active:bg-true-gray-700'
      }
      return `${sizeClasses[this.size]} ${themeClasses[this.theme]}`
    }
  }
})
</script>
