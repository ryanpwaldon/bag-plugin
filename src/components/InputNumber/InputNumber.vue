<template>
  <div class="flex flex-col items-start">
    <label :for="name" class="block text-sm font-medium leading-5 text-gray-700">{{ label }}</label>
    <div class="flex mt-1 rounded-md shadow-sm">
      <button
        type="button"
        class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 border border-gray-300 bg-gray-50 rounded-l-md hover:bg-gray-50 focus:z-20 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        aria-label="Minus"
        @click="decrement"
      >
        <svg class="w-6 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
        </svg>
      </button>
      <input
        :id="name"
        type="text"
        :value="modelValue"
        :placeholder="placeholder"
        @input="this.update($event.target.value)"
        class="flex-1 block w-full -mx-px text-center focus:z-10 sm:text-sm"
        :class="
          error
            ? 'text-red-900 placeholder-red-300 border-red-300 focus:ring-red-500 focus:border-red-500 z-10'
            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
        "
      />
      <button
        type="button"
        class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 border border-gray-300 bg-gray-50 rounded-r-md hover:bg-gray-50 focus:z-20 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        aria-label="Plus"
        @click="increment"
      >
        <svg class="w-6 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    <p v-if="error" class="mt-2 text-sm" :class="[error ? 'text-red-600' : 'text-gray-500']">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
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
    update<T>(value: T) {
      this.$emit('update:modelValue', value)
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
