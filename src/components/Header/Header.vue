<template>
  <div class="flex items-center justify-between flex-shrink-0 p-5 border-b select-none border-borderColor1 xs:p-6">
    <div class="text-lg font-medium leading-6">{{ title }}</div>
    <transition enter-from-class="opacity-0" enter-to-class="opacity-100">
      <div v-if="meta" class="ml-auto mr-5 text-sm leading-5 transition duration-150 ease-in-out text-textColor2">{{ meta }}</div>
    </transition>
    <button
      type="button"
      @click="handleClose"
      class="inline-flex items-center justify-center w-12 h-12 -m-4 transition ease-out rounded-roundness1 text-textColor2 filter hover:brightness-brightness1 focus:outline-none focus:brightness-brightness1"
    >
      <Cross />
    </button>
  </div>
</template>

<script lang="ts">
import Cross from '@/icons/Cross.vue'
import { defineComponent } from 'vue'
import { getParentFrame } from '@/composables/useParentFrame'
export default defineComponent({
  components: { Cross },
  props: {
    title: {
      type: String,
      required: true
    },
    meta: {
      type: String,
      required: false
    },
    close: {
      type: Function,
      required: false
    }
  },
  methods: {
    async handleClose() {
      if (this.close) return this.close()
      getParentFrame().close()
    }
  }
})
</script>
