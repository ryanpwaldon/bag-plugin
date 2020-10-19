<template>
  <Listbox as="div" class="space-y-1" v-model="value" v-slot="{ open }">
    <ListboxLabel class="block text-sm font-medium leading-5 text-gray-700">
      {{ label }}
    </ListboxLabel>
    <div class="relative">
      <span class="inline-block w-full rounded-md shadow-sm">
        <ListboxButton
          class="relative w-full py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md cursor-default focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
        >
          <span class="block truncate">
            {{ selectedVariant && selectedVariant.name }}
          </span>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </ListboxButton>
      </span>
      <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="open" class="absolute w-full mt-1">
          <div class="bg-white rounded-md shadow-lg">
            <ListboxOptions
              static
              class="py-1 overflow-auto text-base leading-6 rounded-md shadow-xs max-h-60 focus:outline-none sm:text-sm sm:leading-5"
            >
              <ListboxOption
                v-for="variant in variants"
                :key="variant.id"
                :value="variant.id"
                :disabled="!variant.inStock"
                v-slot="{ selected, active }"
              >
                <div
                  class="relative py-2 pl-3 cursor-default select-none"
                  :class="active ? 'text-white bg-blue-600 pr-9' : variant.inStock ? 'text-gray-900' : 'text-gray-400 pr-24'"
                >
                  <span :class="`${selected ? 'font-medium' : 'font-normal'} block truncate`">
                    {{ variant.name }}
                  </span>
                  <span :class="`${active ? 'text-white' : 'text-blue-600'} absolute inset-y-0 right-0 flex items-center pr-4`">
                    <svg v-if="selected" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <Badge v-if="!variant.inStock" text="Sold Out" theme="gray-light" />
                  </span>
                </div>
              </ListboxOption>
            </ListboxOptions>
          </div>
          <div class="h-5" />
        </div>
      </transition>
    </div>
  </Listbox>
</template>

<script lang="ts">
import { Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { computed, defineComponent, PropType } from 'vue'
import { useField } from 'vee-validate'
import Badge from '../Badge/Badge.vue'

interface Variant {
  id: string | number
  name: string
  inStock: boolean
}

export default defineComponent({
  components: {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    Badge
  },
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
    const { value, errorMessage } = useField(props.name, props.rules, { initialValue: props.initialValue })
    const selectedVariant = computed(() => props.variants.find(({ id }) => id === value.value))
    return { value, errorMessage, selectedVariant }
  }
})
</script>
