<template>
  <transition @enter="animate" appear>
    <div class="space-y-5 xs:space-y-6" v-if="triggeredOffers.length">
      <p class="z-20 font-medium leading-6 text-gray-900 pointer-events-none">
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
import { Offer } from '@/types/serverApi'
import useOffers from '@/composables/useOffers'
import { defineComponent, PropType } from 'vue'
import useFormatter from '@/composables/useFormatter'
import { AjaxCart, AjaxProduct } from '@/types/ajaxApi'
import CrossSell from '@/components/CrossSell/CrossSell.vue'
import fetchProductByHandle from '@/utils/fetchProductByHandle'
import ProgressBar from '@/components/ProgressBar/ProgressBar.vue'
import useFilterOffers, { TriggerData } from '@/composables/useFilterOffers'
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
    const { offers, loaded: offersLoaded } = useOffers()
    const { formatter } = useFormatter()
    const filterOffers = useFilterOffers()
    return { formatter, offers, filterOffers, offersLoaded }
  },
  data: () => ({
    triggeredOffers: [] as Offer[]
  }),
  watch: {
    offersLoaded: {
      async handler() {
        if (!this.offersLoaded) return
        const triggerData: TriggerData = {
          productIds: [],
          variantIds: [],
          productTypes: [],
          productVendors: [],
          subtotal: this.cart.total_price / 100,
          productTags: await this.fetchProductTags()
        }
        for (const lineItem of this.cart.items) {
          triggerData.productIds.push(this.formatter.toGid('Product', lineItem.product_id))
          triggerData.variantIds.push(this.formatter.toGid('ProductVariant', lineItem.variant_id))
          triggerData.productTypes.push(lineItem.product_type)
          triggerData.productVendors.push(lineItem.vendor)
        }
        this.triggeredOffers = this.filterOffers(this.offers, triggerData)
      },
      immediate: true
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
        delay: anime.stagger(100, { start: this.cart.items.length ? 0 : 300 }),
        targets: el.children
      })
    },
    async fetchProductTags() {
      const tags = []
      const lineItemProducts = await Promise.all(this.cart.items.map(lineItem => fetchProductByHandle(lineItem.handle)))
      for (const product of lineItemProducts) tags.push(...product.tags)
      return [...new Set(tags)]
    },
    handleCrossSellClick(product: AjaxProduct) {
      this.$emit('route', { name: 'Add', props: { product, currencyCode: this.cart.currency } })
    }
  }
})
</script>
