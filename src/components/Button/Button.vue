<template>
  <span class="inline-flex rounded-md select-none" :class="[containerClasses, loading && 'cursor-not-allowed pointer-events-none']">
    <button :type="type" :class="[buttonClasses, 'inline-flex items-center justify-center w-full focus:outline-none']">
      <Spinner v-if="loading" class="w-4 h-4 mr-1 -ml-1" />
      <template v-else>{{ text }}</template>
    </button>
  </span>
</template>

<script lang="ts">
import Spinner from '@/components/Spinner/Spinner.vue'
import { defineComponent, PropType } from 'vue'

type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type Themes = 'white' | 'white-outline' | 'black'
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
      const themeClasses: Classes<Themes> = { white: 'shadow', black: 'shadow', 'white-outline': 'shadow-sm', }
      return `${sizeClasses[this.size]} ${themeClasses[this.theme]}`
    },
    // prettier-ignore
    buttonClasses(): string {
      const sizeClasses: Classes<Sizes> = {
        xs: 'px-2.5 py-1.5 text-xs font-medium leading-4',
        sm: 'px-3 py-2 text-sm font-medium leading-4',
        md: 'px-4 py-2 text-sm font-medium leading-5',
        lg: 'px-5 py-3 text-base font-medium',
        xl: 'px-6 py-3 text-base font-medium'
      }
      const themeClasses: Classes<Themes> = {
        white: 'rounded bg-white text-gray-900 hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        'white-outline': 'rounded bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        black: 'rounded text-white bg-gray-900 hover:bg-black focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
      }
      return `${sizeClasses[this.size]} ${themeClasses[this.theme]}`
    }
  }
})
</script>
