<template>
  <Listbox as="div" class="space-y-1" :modelValue="value" @update:modelValue="$emit('update', $event)" v-slot="{ open }">
    <ListboxLabel class="block text-sm font-medium leading-5 text-gray-700">
      {{ label }}
    </ListboxLabel>
    <div class="relative">
      <span class="inline-block w-full rounded-md shadow-sm">
        <ListboxButton
          class="relative w-full py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md cursor-default focus:outline-none sm:text-sm sm:leading-5"
          :class="[error ? 'border-red-300 focus:border-red-300 focus:shadow-outline-red' : 'focus:shadow-outline-blue focus:border-blue-300']"
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
        <div v-if="open" class="absolute w-full mt-1">
          <div class="bg-white rounded-md shadow-lg">
            <ListboxOptions
              static
              class="py-1 overflow-auto text-base leading-6 rounded-md shadow-xs max-h-60 focus:outline-none sm:text-sm sm:leading-5"
            >
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
                  <span :class="`${selected ? 'font-medium' : 'font-normal'} flex-1 block truncate`">{{ option.title }}</span>
                  <span class="flex items-center flex-shrink-0">
                    <svg v-if="selected" class="w-5 h-5 text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <Badge v-if="!option.disabled && !selected" :text="option.meta" :theme="active ? 'white' : 'gray'" />
                  </span>
                </div>
              </ListboxOption>
            </ListboxOptions>
          </div>
          <div class="h-5" />
        </div>
      </transition>
    </div>
    <p v-if="error" class="mt-2 text-sm" :class="[error ? 'text-red-600' : 'text-gray-500']">{{ error }}</p>
  </Listbox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import Badge from '@/components/Badge/Badge.vue'

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
    value: {
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
      default: 'Select an option'
    },
    error: {
      type: String,
      required: false
    }
  },
  computed: {
    selectedOption(): ListboxOption | undefined {
      return this.options.find(item => this.value === item.id)
    }
  }
})
</script>
