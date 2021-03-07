<template>
  <Fade>
    <div class="space-y-6" v-if="filteredCrossSells.length || progressBars.length">
      <!-- <div v-if="!lineItems.length" class="flex flex-col items-center justify-center w-full h-full space-y-2 text-sm text-gray-500">
        <Bag class="text-gray-400" />
        <span>Your cart is empty</span>
      </div> -->
      <p class="z-20 font-medium leading-6 text-gray-900 transition ease-in-out pointer-events-none" v-if="lineItemsAsProductIds.length">
        {{ $copy.offersTitle }}
      </p>
      <ProgressBar
        v-for="progressBar in incompleteProgressBars"
        :id="progressBar.id"
        :subtotal="subtotal"
        :goal="progressBar.goal"
        :currency-code="currencyCode"
        :cart-token="cartToken"
        :title="progressBar.title"
        :image="progressBar.image"
        :completion-message="progressBar.completionMessage"
        :key="progressBar.id"
      />
      <CrossSell
        v-for="crossSell in filteredCrossSells"
        :id="crossSell.id"
        :cart-token="cartToken"
        :title="crossSell.title"
        :subtitle="crossSell.subtitle"
        :product-id="crossSell.productId"
        :image="crossSell.product.featured_image"
        @click="handleClick(crossSell.productId)"
        :key="crossSell.id"
      />
      <ProgressBar
        v-for="progressBar in completeProgressBars"
        :id="progressBar.id"
        :subtotal="subtotal"
        :goal="progressBar.goal"
        :currency-code="currencyCode"
        :cart-token="cartToken"
        :title="progressBar.title"
        :image="progressBar.image"
        :completion-message="progressBar.completionMessage"
        :key="progressBar.id"
      />
    </div>
  </Fade>
</template>

<script lang="ts">
import Fade from '@/components/Fade/Fade.vue'
import intersection from 'lodash/intersection'
import { defineComponent, PropType } from 'vue'
import useOffers from '@/composables/useOffers'
import CrossSell from '@/components/CrossSell/CrossSell.vue'
import ProgressBar from '@/components/ProgressBar/ProgressBar.vue'
import { CrossSell as CrossSellType } from '@/services/api/services/crossSellService'
import { ProgressBar as ProgressBarType } from '@/services/api/services/progressBarService'
export default defineComponent({
  components: {
    CrossSell,
    ProgressBar,
    Fade
  },
  props: {
    lineItemsAsProductIds: {
      type: Array as PropType<string[]>,
      required: true
    },
    cartToken: {
      type: String,
      required: true
    },
    currencyCode: {
      type: String,
      required: true
    },
    subtotal: {
      type: Number,
      required: true
    }
  },
  setup() {
    const { crossSells, progressBars } = useOffers()
    console.log(progressBars)
    return { crossSells, progressBars }
  },
  computed: {
    filteredCrossSells(): CrossSellType[] {
      return this.crossSells.filter(
        item => intersection(this.lineItemsAsProductIds, item.triggerProductIds).length && !this.lineItemsAsProductIds.includes(item.productId)
      )
    },
    completeProgressBars(): ProgressBarType[] {
      return this.progressBars.filter(item => item.goal - this.subtotal <= 0).sort((a, b) => a.goal - b.goal)
    },
    incompleteProgressBars(): ProgressBarType[] {
      return this.progressBars.filter(item => item.goal - this.subtotal > 0).sort((a, b) => a.goal - b.goal)
    }
  },
  methods: {
    handleClick(productId: string) {
      this.$emit('route', { name: 'Add', props: { productId, currencyCode: this.currencyCode } })
    }
  }
})
</script>
