<template>
  <transition @enter="animate" appear>
    <div class="space-y-5 xs:space-y-6" v-if="triggeredOffers.length">
      <template v-for="(offer, i) in triggeredOffers" :key="i">
        <ProgressBar
          :goal="offer.goal"
          :title="offer.title"
          :image="offer.image"
          :currencyCode="cart.currency"
          :subtotal="cart.total_price / 100"
          v-if="offer.type === 'progressBar'"
          :completionMessage="offer.completionMessage"
        />
        <CrossSell
          :id="offer.id"
          :title="offer.title"
          :cartToken="cart.token"
          :subtitle="offer.subtitle"
          :productId="offer.productId"
          @click="handleCrossSellClick(offer.product)"
          v-if="offer.type === 'crossSell'"
          :image="offer.product.featured_image"
        />
      </template>
    </div>
  </transition>
</template>

<script lang="ts">
import anime from 'animejs'
import useOffers from '@/composables/useOffers'
import { defineComponent, PropType } from 'vue'
import useFormatter from '@/composables/useFormatter'
import { AjaxCart, AjaxProduct } from '@/types/ajaxApi'
import CrossSell from '@/components/CrossSell/CrossSell.vue'
import ProgressBar from '@/components/ProgressBar/ProgressBar.vue'
import useFilterOffers, { Offer, TriggerData } from '@/composables/useFilterOffers'
export default defineComponent({
  components: {
    CrossSell,
    ProgressBar
  },
  props: {
    cart: {
      type: Object as PropType<AjaxCart>,
      required: true
    }
  },
  setup() {
    const { formatter } = useFormatter()
    const { crossSells, progressBars } = useOffers()
    const filterOffers = useFilterOffers()
    return { formatter, crossSells, progressBars, filterOffers }
  },
  computed: {
    offers(): Offer[] {
      return [...this.crossSells, ...this.progressBars]
    },
    triggerData(): TriggerData {
      const triggerData: TriggerData = {
        subtotal: this.cart.total_price / 100,
        productIds: [],
        productTypes: [],
        productVendors: []
      }
      for (const item of this.cart.items) {
        triggerData.productIds.push(this.formatter.toGid('Product', item.product_id))
        triggerData.productTypes.push(item.product_type)
        triggerData.productVendors.push(item.vendor)
      }
      return triggerData
    },
    triggeredOffers(): Offer[] {
      return this.filterOffers(this.offers, this.triggerData)
    }
  },
  methods: {
    animate(el: HTMLElement) {
      anime({
        opacity: {
          value: [0, 1],
          easing: 'easeInOutQuad',
          duration: 300
        },
        translateY: {
          value: [10, 0],
          easing: 'easeOutQuad',
          duration: 600
        },
        delay: anime.stagger(100, { start: 600 }),
        targets: el.children
      })
    },
    handleCrossSellClick(product: AjaxProduct) {
      this.$emit('route', { name: 'Add', props: { product, currencyCode: this.cart.currency } })
    }
  }
})
</script>
