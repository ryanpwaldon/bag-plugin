<template>
  <div class="w-screen h-screen antialiased">
    <Cart>
      <slot />
    </Cart>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Cart from './components/Cart/Cart.vue'
export default defineComponent({
  components: {
    Cart
  }
})
</script>
