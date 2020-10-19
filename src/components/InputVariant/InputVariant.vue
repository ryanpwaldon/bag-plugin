<template>
  <div class="space-y-1">
    <label id="listbox-label" class="block text-sm font-medium leading-5 text-gray-700">{{ label }}</label>
    <div class="relative">
      <span class="inline-block w-full rounded-md shadow-sm">
        <button
          type="button"
          aria-haspopup="listbox"
          :aria-expanded="active"
          aria-labelledby="listbox-label"
          class="relative w-full py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md cursor-default focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
          @click="handleClick"
        >
          <div class="flex items-center space-x-3">
            <span
              class="flex-shrink-0 inline-block w-2 h-2 rounded-full"
              :class="[selectedVariant && selectedVariant.inStock ? 'bg-green-400' : 'bg-gray-200']"
              :aria-label="selectedVariant && selectedVariant.inStock ? 'In stock' : 'Out of stock'"
            ></span>
            <span class="block truncate">
              {{ (selectedVariant && selectedVariant.name) || placeholder }}
            </span>
          </div>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </button>
      </span>
      <div v-if="active" class="absolute w-full mt-1">
        <div class="w-full bg-white rounded-md shadow-lg">
          <ul
            tabindex="-1"
            role="listbox"
            aria-labelledby="listbox-label"
            :aria-activedescendant="`listbox-item-${activeIndex}`"
            class="py-1 overflow-auto text-base leading-6 rounded-md shadow-xs max-h-60 focus:outline-none sm:text-sm sm:leading-5"
          >
            <li
              :key="i"
              @click="handleChange(id)"
              v-for="({ id, name, inStock }, i) in variants"
              :class="[activeIndex === i ? 'text-white bg-blue-600' : 'text-gray-900']"
              class="relative py-2 pl-3 cursor-default select-none pr-9"
              @mouseenter="activeIndex = i"
              @mouseleave="activeIndex = null"
              :id="`listbox-item-${i}`"
              role="option"
            >
              <div class="flex items-center space-x-3">
                <span
                  :aria-label="inStock ? 'In stock' : 'Out of stock'"
                  class="flex-shrink-0 inline-block w-2 h-2 rounded-full"
                  :class="[inStock ? 'bg-green-400' : 'bg-gray-200']"
                />
                <span class="block font-normal truncate" :class="[i === selectedIndex ? 'font-semibold' : 'font-normal']">
                  {{ name }}
                </span>
              </div>
              <span
                v-if="i === selectedIndex"
                class="absolute inset-y-0 right-0 flex items-center pr-4"
                :class="[activeIndex === i ? 'text-white' : 'text-blue-600']"
              >
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </li>
          </ul>
        </div>
        <div class="w-full h-5" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useField } from 'vee-validate'

interface Variant {
  id: string | number
  name: string
  inStock: boolean
}

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
      required: true
    },
    rules: {
      type: Object,
      required: true
    },
    initialValue: {
      type: [String, Number],
      required: true
    },
    variants: {
      type: Array as PropType<Variant[]>,
      required: true
    }
  },
  setup(props) {
    const { value, errorMessage, handleChange } = useField(props.name, props.rules, { initialValue: props.initialValue })
    return { value, errorMessage, handleChange }
  },
  data: () => ({
    active: false,
    activeIndex: null
  }),
  computed: {
    selectedIndex(): number {
      console.log(this.value)
      console.log(this.variants.findIndex(item => item.id === this.value))
      return this.variants.findIndex(item => item.id === this.value)
    },
    selectedVariant(): Variant | undefined {
      return this.variants[this.selectedIndex]
    }
  },
  methods: {
    handleClick(e: MouseEvent) {
      if (!this.active) e.stopImmediatePropagation()
      this.active = !this.active
      if (this.active) window.addEventListener('click', () => (this.active = false), { once: true })
    }
  }
})
</script>
