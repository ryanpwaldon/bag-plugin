<template>
  <span class="inline-flex select-none rounded-borderRadiusPrimary" :class="containerClasses">
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
        primary: 'transition ease-out rounded-borderRadiusPrimary border-borderWidthPrimary border-colorBorderPrimary text-colorButtonPrimaryText bg-colorButtonPrimaryBackground hover:opacity-90 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        white: 'transition ease-out rounded-borderRadiusPrimary bg-white border-borderWidthPrimary border-colorBorderPrimary text-colorTextPrimary hover:opacity-90 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        'white-outline': 'rounded-borderRadiusPrimary bg-white text-colorTextPrimary border border-colorBorderPrimary hover:opacity-90 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
      }
      return `${sizeClasses[this.size]} ${themeClasses[this.theme]}`
    },
    containerClasses(): string {
      const themeClasses: Classes<Themes> = {
        primary: 'shadow-shadowPrimary',
        white: 'shadow-shadowPrimary',
        'white-outline': 'shadow-shadowSecondary'
      }
      return `${themeClasses[this.theme]}`
    }
  }
})
</script>
