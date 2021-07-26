<template>
  <Listbox as="div" class="flex flex-col items-start space-y-1" v-model="valueModelled" v-slot="{ open }">
    <ListboxLabel class="block text-sm font-medium text-colorTextSecondary">
      {{ label }}
    </ListboxLabel>
    <div class="relative w-full">
      <span class="inline-block w-full rounded-borderRadiusPrimary shadow-shadowSecondary">
        <ListboxButton
          class="relative w-full py-2 pl-3 pr-10 text-sm font-medium text-left bg-white border cursor-default rounded-borderRadiusPrimary focus:outline-none"
          :class="
            error
              ? 'border-red-300 focus-visible:ring-1 focus-visible:ring-red-400'
              : 'border-colorBorderPrimary focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500'
          "
        >
          <span class="block truncate">
            <span v-if="selectedOption">{{ selectedOption.title }}</span>
            <span v-else :class="error ? 'text-red-300' : 'text-colorTextSecondary'">{{ placeholder }}</span>
          </span>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <Selector />
          </span>
        </ListboxButton>
      </span>
      <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions static v-if="open" class="absolute z-10 w-full mt-1 focus:outline-none">
          <div class="overflow-hidden bg-white rounded-borderRadiusPrimary border-borderWidthPrimary shadow-shadowPrimary border-colorBorderPrimary">
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
                  :class="[active && 'bg-gray-100', disabled && 'text-colorTextSecondary']"
                >
                  <span :class="`${selected ? 'font-medium' : 'font-normal'} flex-1 block truncate`">{{ option.title }}</span>
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
import Selector from '@/icons/Selector.vue'
import useModel from '@/composables/useModel'
import { defineComponent, PropType } from 'vue'
import Badge from '@/components/Badge/Badge.vue'
import { Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'

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
    Selector,
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
