<template>
  <Fade>
    <div class="space-y-5 xs:space-y-6" v-if="triggeredOffers.length">
      <p class="z-20 font-medium leading-6 text-gray-900 transition ease-in-out pointer-events-none" v-if="cart.items.length">
        {{ $copy.offersTitle }}
      </p>
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
          @click="handleCrossSellClick"
          v-if="offer.type === 'crossSell'"
          :image="offer.product.featured_image"
        />
      </template>
    </div>
  </Fade>
</template>

<script lang="ts">
import Fade from '@/components/Fade/Fade.vue'
import { defineComponent, PropType } from 'vue'
import useFormatter from '@/composables/useFormatter'
import { AjaxCart, AjaxProduct } from '@/types/ajaxApi'
import CrossSell from '@/components/CrossSell/CrossSell.vue'
import ProgressBar from '@/components/ProgressBar/ProgressBar.vue'
import useFilterOffers, { Offer, TriggerData } from '@/composables/useFilterOffers'
export default defineComponent({
  components: {
    CrossSell,
    ProgressBar,
    Fade
  },
  props: {
    offers: {
      type: Array as PropType<Offer[]>,
      required: true
    },
    cart: {
      type: Object as PropType<AjaxCart>,
      required: true
    }
  },
  setup() {
    const { formatter } = useFormatter()
    const filterOffers = useFilterOffers()
    return { formatter, filterOffers }
  },
  computed: {
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
    handleCrossSellClick(product: AjaxProduct) {
      this.$emit('route', { name: 'Add', props: { product, currencyCode: this.cart.currency } })
    }
  }
})
</script>
