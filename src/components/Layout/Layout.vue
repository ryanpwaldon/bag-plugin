<template>
  <div class="relative flex items-end justify-end w-full h-full antialiased sm:p-3">
    <div
      ref="backdrop"
      class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"
      style="will-change: transform"
      @click="handleBackdropClick"
    />
    <div ref="cart" class="relative w-full h-full overflow-hidden bg-gray-100 sm:shadow-lg sm:w-130 sm:rounded" style="will-change: transform">
      <slot v-if="open" />
    </div>
  </div>
</template>

<script lang="ts">
import anime from 'animejs'
import useScreen from '@/composables/useScreen'
import useParentFrame from '@/composables/useParentFrame'
import { defineComponent } from 'vue'
export default defineComponent({
  setup: () => {
    const screen = useScreen()
    const { connect, parentFrame } = useParentFrame()
    return {
      screen,
      connect,
      parentFrame
    }
  },
  mounted() {
    this.connect({ open: this.handleOpen, close: this.handleClose })
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
    // prettier-ignore
    async handleOpen() {
      this.open = true
      const tl = anime.timeline()
      const screen = this.screen()
      const { backdrop, cart } = this.$refs
      if (screen) {
        tl.add({ targets: backdrop, easing: 'easeInOutQuad', duration: 200, opacity: [0, 1] })
        tl.add({ targets: cart, duration: 200, translateX: { value: [20, 0], easing: 'easeOutQuad' }, opacity: { value: [0, 1], easing: 'easeInOutQuad' } }, 0)
      } else {
        tl.add({ targets: [backdrop, cart], easing: 'easeInOutQuad', duration: 200, opacity: [0, 1] })
      }
      await tl.finished
    },
    async handleClose() {
      const tl = anime.timeline()
      const { backdrop, cart } = this.$refs
      tl.add({ targets: [backdrop, cart], easing: 'easeInOutQuad', duration: 200, opacity: [1, 0] })
      await tl.finished
      this.open = false
      this.$emit('route', { name: 'Home', props: {} })
    },
    async handleBackdropClick() {
      this.parentFrame.close()
    }
  }
})
</script>
