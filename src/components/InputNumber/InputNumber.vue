<template>
  <div>
    <label :for="name" class="block text-sm font-medium leading-5 text-gray-700">{{ label }}</label>
    <span class="relative z-0 inline-flex w-full mt-1 shadow-sm">
      <button
        type="button"
        class="relative inline-flex items-center px-2 py-2 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-l-md hover:text-gray-400 focus:z-20 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500"
        aria-label="Minus"
        @click="decrement"
      >
        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
        </svg>
      </button>
      <input
        :id="name"
        type="text"
        class="z-10 block w-full -ml-px text-center transition duration-150 ease-in-out rounded-none form-input sm:text-sm sm:leading-5"
        :class="[errorMessage && 'text-red-900 placeholder-red-300 border-red-300 focus:border-red-300 focus:shadow-outline-red']"
        :placeholder="placeholder"
        :value="value"
        @input="handleChange"
      />
      <button
        type="button"
        class="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-r-md hover:text-gray-400 focus:z-20 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500"
        aria-label="Plus"
        @click="increment"
      >
        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </span>
    <p v-if="errorMessage" class="mt-2 text-sm" :class="[errorMessage ? 'text-red-600' : 'text-gray-500']">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useField } from 'vee-validate'
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
    rules: {
      type: String,
      required: false
    },
    initialValue: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const { value, errorMessage, handleChange } = useField(props.name, props.rules as string, { initialValue: props.initialValue })
    return { value, errorMessage, handleChange }
  },
  methods: {
    increment() {
      const value = parseInt(this.value) + 1
      this.handleChange(value)
    },
    decrement() {
      const value = Math.max(parseInt(this.value) - 1, 1)
      this.handleChange(value)
    }
  }
})
</script>
