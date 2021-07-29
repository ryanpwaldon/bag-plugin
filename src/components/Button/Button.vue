<template>
  <span class="inline-flex select-none rounded-roundness1" :class="containerClasses">
    <button :type="type" :class="[buttonClasses, 'inline-flex items-center justify-center w-full focus:outline-none']">{{ text }}</button>
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

type Sizes = 'md' | 'lg'
type Themes = 'white' | 'white-outline' | 'primary'
type Classes<T extends string> = { [K in T]: string }

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true
    },
    type: {
      type: String as PropType<'submit' | 'button'>,
      default: 'button'
    },
    size: {
      type: String as PropType<Sizes>,
      default: 'lg'
    },
    theme: {
      type: String as PropType<Themes>,
      default: 'primary'
    }
  },
  computed: {
    // prettier-ignore
    buttonClasses(): string {
      const sizeClasses: Classes<Sizes> = {
        md: 'px-4 py-2 text-sm font-medium',
        lg: 'px-5 py-3 text-base font-medium'
      }
      const themeClasses: Classes<Themes> = {
        primary: 'transition ease-out rounded-roundness1 border-borderWidth1 border-borderColor1 text-textColor3 bg-themeColor3 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 filter hover:brightness-brightness1',
        white: 'transition ease-out rounded-roundness1 bg-themeColor2 border-borderWidth1 border-borderColor1 text-textColor1 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 filter hover:brightness-brightness1',
        'white-outline': 'transition rounded-roundness1 bg-themeColor2 text-textColor1 border border-borderColor1 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 filter hover:brightness-brightness1',
      }
      return `${sizeClasses[this.size]} ${themeClasses[this.theme]}`
    },
    containerClasses(): string {
      const themeClasses: Classes<Themes> = {
        primary: 'shadow-shadow1',
        white: 'shadow-shadow1',
        'white-outline': 'shadow-shadow2'
      }
      return `${themeClasses[this.theme]}`
    }
  }
})
</script>
