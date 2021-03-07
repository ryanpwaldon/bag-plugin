<template>
  <Fade>
    <div class="space-y-6" v-if="filteredCrossSells.length || progressBars.length">
      <p class="z-20 font-medium leading-6 text-gray-900 transition ease-in-out pointer-events-none" v-if="lineItemsAsProductIds.length">
        {{ $copy.offersTitle }}
      </p>
      <ProgressBar
        v-for="progressBar in incompleteProgressBars"
        :subtotal="subtotal"
        :goal="progressBar.goal"
        :currency-code="currencyCode"
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
        :subtotal="subtotal"
        :goal="progressBar.goal"
        :currency-code="currencyCode"
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
import { AjaxLineItem } from '@/types/ajaxApi'
import { defineComponent, PropType } from 'vue'
import useFormatter from '@/composables/useFormatter'
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
    crossSells: {
      type: Array as PropType<CrossSellType[]>,
      required: true
    },
    progressBars: {
      type: Array as PropType<ProgressBarType[]>,
      required: true
    },
    lineItems: {
      type: Array as PropType<AjaxLineItem[]>,
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
    const { formatter } = useFormatter()
    return { formatter }
  },
  computed: {
    lineItemsAsProductIds(): string[] {
      return this.lineItems.map(item => this.formatter.toGid('Product', item.product_id))
    },
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
