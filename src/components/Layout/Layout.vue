<template>
  <div class="relative flex items-end justify-end w-full h-full p-1 antialiased sm:p-2">
    <div
      ref="backdrop"
      class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75"
      style="will-change: transform"
      @click="handleBackdropClick"
    />
    <div ref="cart" class="w-full overflow-hidden shadow-lg h-10/12 sm:h-full bg-gray-50 rounded-2xl sm:w-112" style="will-change: transform">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { connect, comms } from '@/services/comms/comms'
import anime from 'animejs'
export default defineComponent({
  mounted() {
    connect({ open: this.open, close: this.close })
  },
  methods: {
    async open() {
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
    async close() {
      const tl = anime.timeline()
      const { backdrop, cart } = this.$refs
      tl.add({
        targets: [backdrop, cart],
        easing: 'easeInOutQuad',
        duration: 200,
        opacity: [1, 0]
      })
      await tl.finished
    },
    handleBackdropClick() {
      comms.triggerStateChange('close')
    }
  }
})
</script>
