<template>
  <div class="flex items-center justify-between flex-shrink-0 p-5 border-b border-gray-200 select-none">
    <BackButton v-if="back" :text="title" class="-mr-2" @click="back" />
    <div v-else class="text-lg font-medium leading-6 text-gray-900">{{ title }}</div>
    <div v-if="meta" class="ml-auto mr-4 text-sm leading-5 text-gray-500">{{ meta }}</div>
    <CloseButton class="-mr-2" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BackButton from '../BackButton/BackButton.vue'
import CloseButton from '../CloseButton/CloseButton.vue'
export default defineComponent({
  components: {
    BackButton,
    CloseButton
  },
  props: {
    title: {
      type: String,
      required: true
    },
    meta: {
      type: String,
      required: false
    },
    back: {
      type: Function,
      required: false
    }
  }
})
</script>
