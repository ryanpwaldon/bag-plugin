<template>
  <div class="flex items-center justify-between">
    <div class="text-lg font-medium leading-6 text-gray-900">{{ title }}</div>
    <div v-if="meta" class="ml-auto mr-4 text-sm leading-5 text-gray-500">{{ meta }}</div>
    <CloseButton @click="close" class="-mr-2" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CloseButton from '../CloseButton/CloseButton.vue'
import { comms } from '@/services/comms/comms'
export default defineComponent({
  components: {
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
    }
  },
  methods: {
    close() {
      comms.triggerStateChange('close')
    }
  }
})
</script>
