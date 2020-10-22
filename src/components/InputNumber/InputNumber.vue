<template>
  <div>
    <label :for="name" class="block text-sm font-medium leading-5 text-gray-700">{{ label }}</label>
    <span class="relative z-0 inline-flex w-full mt-1 shadow-sm">
      <button
        type="button"
        class="relative inline-flex items-center px-2 py-2 text-sm font-medium leading-5 text-gray-400 transition duration-150 ease-in-out border border-gray-300 bg-gray-50 rounded-l-md hover:text-gray-400 focus:z-20 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500"
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
        class="z-10 block w-full -ml-px text-center transition duration-150 ease-in-out rounded-none form-input sm:text-sm sm:leading-5"
        :class="[error && 'text-red-900 placeholder-red-300 border-red-300 focus:border-red-300 focus:shadow-outline-red']"
        :placeholder="placeholder"
        :value="value"
        @input="$emit('update:value', $event.target.value)"
      />
      <button
        type="button"
        class="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium leading-5 text-gray-400 transition duration-150 ease-in-out border border-gray-300 bg-gray-50 rounded-r-md hover:text-gray-400 focus:z-20 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500"
        aria-label="Plus"
        @click="increment"
      >
        <svg class="w-6 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
      </button>
    </span>
    <p v-if="error" class="mt-2 text-sm" :class="[error ? 'text-red-600' : 'text-gray-500']">
      {{ error }}
    </p>
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
    value: {
      type: Number,
      required: true
    },
    error: {
      type: String,
      required: false
    }
  },
  methods: {
    increment() {
      const value = this.value + 1
      this.$emit('update:value', value)
    },
    decrement() {
      const value = Math.max(this.value - 1, 1)
      this.$emit('update:value', value)
    }
  }
})
</script>
