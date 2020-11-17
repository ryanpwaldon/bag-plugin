<template>
  <div class="relative flex items-end justify-end w-full h-full antialiased sm:p-6">
    <div
      ref="backdrop"
      class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75"
      style="will-change: transform"
      @click="handleBackdropClick"
    />
    <div ref="cart" class="w-full h-full overflow-hidden shadow-lg bg-true-gray-50 sm:rounded-2xl sm:w-112" style="will-change: transform">
      <slot v-if="open" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { connect, comms } from '@/services/comms/comms'
import anime from 'animejs'
export default defineComponent({
  mounted() {
    connect({ open: this.handleOpen, close: this.handleClose })
    this.set()
  },
  data: () => ({
    open: false
  }),
  methods: {
    set() {
      const { backdrop, cart } = this.$refs
      anime.set([backdrop, cart], { opacity: 0 })
    },
    async handleOpen() {
      this.open = true
      const tl = anime.timeline()
      const { backdrop, cart } = this.$refs
      tl.add({
        targets: backdrop,
        easing: 'easeInOutQuad',
        duration: 200,
        opacity: [0, 1]
      })
      tl.add({
        targets: cart,
        easing: 'easeInOutQuad',
        duration: 200,
        translateX: [10, 0],
        opacity: [0, 1]
      })
      await tl.finished
    },
    async handleClose() {
      const tl = anime.timeline()
      const { backdrop, cart } = this.$refs
      tl.add({
        targets: [backdrop, cart],
        easing: 'easeInOutQuad',
        duration: 200,
        opacity: [1, 0]
      })
      await tl.finished
      this.open = false
      this.$emit('route', { name: 'Home', props: {} })
    },
    async handleBackdropClick() {
      const { triggerStateChange } = await comms
      triggerStateChange('close')
    }
  }
})
</script>
