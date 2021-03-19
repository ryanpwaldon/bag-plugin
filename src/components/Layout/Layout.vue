<template>
  <div ref="container" class="relative flex items-end justify-end w-full h-full antialiased sm:p-3">
    <div class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" @click="handleBackdropClick" />
    <div ref="cart" class="relative w-full h-full overflow-hidden bg-gray-100 sm:shadow-lg sm:w-130 sm:rounded" style="will-change: transform;">
      <slot v-if="open" />
    </div>
  </div>
</template>

<script lang="ts">
import anime from 'animejs'
import useScreens from '@/composables/useScreens'
import useParentFrame from '@/composables/useParentFrame'
import { defineComponent } from 'vue'
export default defineComponent({
  setup: () => {
    const screens = useScreens()
    const { connect, parentFrame } = useParentFrame()
    return {
      screens,
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
      const { container } = this.$refs
      anime.set(container, { opacity: 0 })
    },
    // prettier-ignore
    async handleOpen() {
      this.open = true
      const tl = anime.timeline()
      const screens = this.screens()
      const { container, cart } = this.$refs
      tl.add({ targets: container, easing: 'easeInOutQuad', duration: 200, opacity: [0, 1] })
      if (screens.includes('sm')) tl.add({ targets: cart, duration: 200, translateX: [20, 0], easing: 'easeOutQuad' }, 0)
      await tl.finished
    },
    async handleClose() {
      const tl = anime.timeline()
      const { container } = this.$refs
      tl.add({ targets: container, easing: 'easeInOutQuad', duration: 200, opacity: [1, 0] })
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
