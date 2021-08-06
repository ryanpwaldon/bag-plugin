<template>
  <label
    class="box-border flex px-4 py-3 text-xs transition ease-out cursor-pointer select-none bg-themeColor2 rounded-roundness1 filter hover:brightness-brightness1 border-borderWidth1 border-borderColor1"
    :class="displayError ? 'ring-2 ring-red-600' : 'shadow-shadow1'"
  >
    <div class="flex items-center mr-4">
      <input
        type="checkbox"
        :checked="checked"
        @input="handleInput"
        class="w-4 h-4 text-black transition rounded cursor-pointer outline-noneform-radio focus:ring-0 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
      />
    </div>
    <div>
      <p class="mb-0.5 font-medium">{{ cartSettings.termsTitle }}</p>
      <p class="text-textColor2">
        <span>{{ cartSettings.termsAgreement }}&nbsp;</span>
        <a
          target="_parent"
          :href="cartSettings.termsLinkUrl"
          class="underline transition filter hover:brightness-brightness1"
          v-if="cartSettings.termsLinkUrl && cartSettings.termsLinkText"
        >
          {{ cartSettings.termsLinkText }}
        </a>
      </p>
    </div>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useCartSettings from '@/composables/useCartSettings'
export default defineComponent({
  props: {
    checked: {
      type: Boolean,
      required: true
    },
    displayError: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { emit }) {
    const { cartSettings } = useCartSettings()
    const handleInput = (event: Event) => {
      emit('update:display-error', false)
      const el = event.target as HTMLInputElement
      emit('update:checked', el.checked)
    }
    return { cartSettings, handleInput }
  }
})
</script>
