<template>
  <div ref="container" class="relative flex items-end justify-end w-full h-full antialiased sm:p-cartPadding">
    <div class="absolute top-0 left-0 w-full h-full bg-backdropColor opacity-backdropOpacity" @click="handleBackdropClick" />
    <div
      ref="cart"
      @click="userInteracted = true"
      style="will-change: transform;"
      class="relative w-full h-full overflow-hidden bg-themeColor1 sm:shadow-shadow1 sm:w-130 sm:rounded-cartRoundness border-borderWidth1 border-borderColor1"
    >
      <slot v-if="open" />
    </div>
  </div>
</template>

<script lang="ts">
import anime from 'animejs'
import { defineComponent } from 'vue'
import { CartOpenMethod } from 'script/start'
import useScreens from '@/composables/useScreens'
import useCartSettings from '@/composables/useCartSettings'
import { connectToParentFrame, getParentFrame } from '@/composables/useParentFrame'
export default defineComponent({
  setup: () => {
    const screens = useScreens()
    const { cartSettings } = useCartSettings()
    return { screens, cartSettings }
  },
  mounted() {
    connectToParentFrame({ open: this.handleOpen, close: this.handleClose })
    this.set()
  },
  data: () => ({
    open: false,
    userInteracted: false
  }),
  methods: {
    set() {
      const { container } = this.$refs
      anime.set(container, { opacity: 0 })
    },
    // prettier-ignore
    async handleOpen(cartOpenMethod: CartOpenMethod) {
      this.open = true
      const tl = anime.timeline()
      const screens = await this.screens()
      const { container, cart } = this.$refs
      tl.add({ targets: container, easing: 'easeInOutQuad', duration: 200, opacity: [0, 1] })
      if (screens.includes('sm')) tl.add({ targets: cart, duration: 200, translateX: [20, 0], easing: 'easeOutQuad' }, 0)
      await tl.finished
      if (this.cartSettings.autoCloseEnabled && cartOpenMethod === 'add-to-cart-form') this.startAutoClose()
    },
    async handleClose() {
      this.userInteracted = false
      const tl = anime.timeline()
      const { container } = this.$refs
      tl.add({ targets: container, easing: 'easeInOutQuad', duration: 200, opacity: [1, 0] })
      await tl.finished
      this.open = false
      this.$emit('route', { name: 'Home', props: {} })
    },
    async handleBackdropClick() {
      getParentFrame().close()
    },
    async startAutoClose() {
      await new Promise(resolve => setTimeout(resolve, this.cartSettings.autoCloseDelay * 1000))
      if (!this.userInteracted) getParentFrame().close()
    }
  }
})
</script>
