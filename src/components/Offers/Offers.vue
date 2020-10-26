<template>
  <transition
    enter-active-class="transition duration-150 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <CardLayout v-if="offerData.length">
      <DividerLabel text="Offers" class="z-20 py-1 transition ease-in-out" />
      <Offer
        :key="offer.id"
        v-for="[offer, product] in offerData"
        :title="offer.title"
        :subtitle="offer.subtitle"
        :image="product.image"
        @click="handleClick"
      />
    </CardLayout>
  </transition>
</template>

<script lang="ts">
import Offer from '@/components/Offer/Offer.vue'
import CardLayout from '@/components/CardLayout/CardLayout.vue'
import DividerLabel from '@/components/DividerLabel/DividerLabel.vue'
import useOffers from '@/composables/useOffers'
import useProduct from '@/composables/useProduct'
import useFormatter from '@/composables/useFormatter'
import intersection from 'lodash/intersection'
import { Cart } from '@/types/shopify'
import { Product } from '@/services/api/services/productService'
import { Offer as OfferType } from '@/services/api/services/offerService'
import { defineComponent, PropType, Ref, ref, watchEffect } from 'vue'
export default defineComponent({
  components: {
    Offer,
    CardLayout,
    DividerLabel
  },
  props: {
    cart: {
      type: Object as PropType<Cart>,
      required: true
    }
  },
  setup(props) {
    const { offers } = useOffers()
    const { fetchProduct } = useProduct()
    const { formatter } = useFormatter()
    const lineItemsAsProductIds = props.cart.items.map(item => formatter.toGid('Product', item.product_id))
    const offerData: Ref<[OfferType, Product][]> = ref([])
    const fetchOfferData = async () => {
      console.log(offers.value)
      offerData.value = await Promise.all(
        offers.value
          .filter(item => intersection(lineItemsAsProductIds, item.triggers).length)
          .map(async item => [item, await fetchProduct(item.productId)] as [OfferType, Product])
      )
    }
    watchEffect(fetchOfferData)
    return { offerData }
  },
  methods: {
    handleClick() {
      console.log('hello')
    }
  }
})
</script>
