<template>
  <span class="inline-flex rounded-md select-none" :class="[containerClasses, loading && 'cursor-not-allowed pointer-events-none']">
    <component
      :is="link ? 'a' : 'button'"
      v-bind="link ? { target: '_parent', href: link } : { type }"
      :class="[buttonClasses, 'inline-flex items-center justify-center w-full focus:outline-none']"
    >
      <Spinner v-if="loading" class="w-4 h-4 mr-1 -ml-1" />
      <template v-else>{{ text }}</template>
    </component>
  </span>
</template>

<script lang="ts">
import Spinner from '@/components/Spinner/Spinner.vue'
import { defineComponent, PropType } from 'vue'

type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type Themes = 'white' | 'black'
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
    },
    link: {
      type: String,
      required: false
    }
  },
  computed: {
    // prettier-ignore
    containerClasses(): string {
      const sizeClasses: Classes<Sizes> = { xs: '', sm: '', md: '', lg: '', xl: '' }
      const themeClasses: Classes<Themes> = { white: 'shadow-sm', black: 'shadow' }
      return `${sizeClasses[this.size]} ${themeClasses[this.theme]}`
    },
    // prettier-ignore
    buttonClasses(): string {
      const sizeClasses: Classes<Sizes> = {
        xs: 'rounded px-2.5 py-1.5 text-xs font-medium leading-4',
        sm: 'rounded-md px-3 py-2 text-sm font-medium leading-4',
        md: 'rounded-md px-4 py-2 text-sm font-medium leading-5',
        lg: 'rounded-lg px-5 py-3 text-base font-medium',
        xl: 'rounded-md px-6 py-3 text-base font-medium'
      }
      const themeClasses: Classes<Themes> = {
        white: 'bg-white text-gray-900 hover:bg-gray-50 border focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        black: 'text-white bg-gray-900 hover:bg-black focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
      }
      return `${sizeClasses[this.size]} ${themeClasses[this.theme]}`
    }
  }
})
</script>
