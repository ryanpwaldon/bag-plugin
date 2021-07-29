<template>
  <div>
    <label :for="name" class="inline-block text-sm font-medium text-textColor2">{{ label }}</label>
    <div class="flex mt-1 rounded-roundness1 shadow-shadow2">
      <button
        type="button"
        aria-label="Minus"
        @click="decrement"
        class="relative inline-flex items-center px-2 py-2 text-sm font-medium transition border bg-themeColor2 rounded-l-roundness1 text-textColor2 border-borderColor1 focus:z-20 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 filter hover:brightness-brightness1"
      >
        <Minus class="w-6 h-4" />
      </button>
      <input
        :id="name"
        type="text"
        :value="modelValue"
        @input="handleInput"
        :placeholder="placeholder"
        class="flex-1 min-w-0 -mx-px text-sm font-medium text-center transition border focus:z-10 focus:outline-none bg-themeColor2 filter hover:brightness-brightness1"
        :class="
          error
            ? 'text-red-900 placeholder-red-300 border-red-300 focus-visible:ring-red-500 focus-visible:border-red-500 z-10'
            : 'border-borderColor1 focus-visible:ring-blue-500 focus-visible:border-blue-500'
        "
      />
      <button
        type="button"
        aria-label="Plus"
        @click="increment"
        class="relative inline-flex items-center px-2 py-2 text-sm font-medium transition border bg-themeColor2 rounded-r-roundness1 text-textColor2 border-borderColor1 focus:z-20 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 filter hover:brightness-brightness1"
      >
        <Plus class="w-6 h-4" />
      </button>
    </div>
    <p v-if="error" class="mt-2 text-sm" :class="[error ? 'text-red-600' : 'text-textColor2']">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import Plus from '@/icons/Plus.vue'
import Minus from '@/icons/Minus.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: { Minus, Plus },
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: false
    },
    modelValue: {
      type: [String, Number],
      required: true
    },
    error: {
      type: String,
      required: false
    }
  },
  methods: {
    /* eslint-disable */
    update(value: number) {
      this.$emit('update:modelValue', value)
    },
    handleInput(event: any) {
      this.update(event.target.value)
    },
    ensureInt(value: string | number) {
      return typeof value === 'string' ? parseInt(value) : value
    },
    increment() {
      const value = this.ensureInt(this.modelValue) + 1
      this.update(value)
    },
    decrement() {
      const value = Math.max(this.ensureInt(this.modelValue) - 1, 1)
      this.update(value)
    }
  }
})
</script>
