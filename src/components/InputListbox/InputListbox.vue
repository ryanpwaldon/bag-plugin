<template>
  <Listbox as="div" class="flex flex-col items-start space-y-1" v-model="valueModelled" v-slot="{ open }">
    <ListboxLabel class="block text-sm font-medium leading-5 text-gray-700">
      {{ label }}
    </ListboxLabel>
    <div class="relative w-full">
      <span class="inline-block w-full shadow-sm">
        <ListboxButton
          class="relative w-full py-2 pl-3 pr-10 text-sm text-left bg-white border rounded cursor-default focus:outline-none"
          :class="
            error
              ? 'border-red-300 focus-visible:ring-1 focus-visible:ring-red-400'
              : 'border-gray-300 focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500'
          "
        >
          <span class="block truncate">
            <span v-if="selectedOption">{{ selectedOption.title }}</span>
            <span v-else :class="error ? 'text-red-300' : 'text-gray-400'">{{ placeholder }}</span>
          </span>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </ListboxButton>
      </span>
      <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions static v-if="open" class="absolute w-full mt-1 focus:outline-none">
          <div class="overflow-hidden bg-white rounded shadow-lg ring-1 ring-black ring-opacity-5">
            <div class="py-1 overflow-auto text-sm leading-6 max-h-56 sm:max-h-60 sm:leading-5">
              <ListboxOption
                v-for="option in options"
                v-slot="{ selected, active, disabled }"
                :disabled="option.disabled"
                :value="option.id"
                :key="option.id"
                class="focus:outline-none"
              >
                <div
                  class="flex justify-between py-2 pl-3 pr-4 space-x-4 cursor-default select-none"
                  :class="[active && 'bg-gray-100', disabled ? 'text-gray-400' : 'text-gray-900']"
                >
                  <span :class="`${selected ? 'font-semibold' : 'font-normal'} flex-1 block truncate`">{{ option.title }}</span>
                  <span class="flex items-center flex-shrink-0">
                    <Badge :text="option.meta" :theme="active ? 'white' : 'gray'" />
                  </span>
                </div>
              </ListboxOption>
            </div>
          </div>
          <div class="h-5" />
        </ListboxOptions>
      </transition>
    </div>
    <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
  </Listbox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import Badge from '@/components/Badge/Badge.vue'
import useModel from '@/composables/useModel'

export interface ListboxOption {
  id: string
  meta: string
  title: string
  disabled: boolean
}

export default defineComponent({
  components: {
    Badge,
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption
  },
  props: {
    modelValue: {
      type: String,
      required: false
    },
    options: {
      type: Array as PropType<ListboxOption[]>,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Select a type'
    },
    error: {
      type: String,
      required: false
    }
  },
  setup(props, { emit }) {
    return {
      valueModelled: useModel(props, emit, 'modelValue')
    }
  },
  computed: {
    selectedOption(): ListboxOption | undefined {
      return this.options.find(item => this.modelValue === item.id)
    }
  }
})
</script>
