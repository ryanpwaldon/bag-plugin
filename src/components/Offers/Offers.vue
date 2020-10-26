<template>
  <DividerLabel text="Offers" class="z-20 py-1 transition ease-in-out" />
  <Offer
    :key="offer.id"
    v-for="[offer, product] in offerData"
    :title="offer.title"
    :subtitle="offer.subtitle"
    :image="product.image"
    @click="handleClick"
  />
</template>

<script lang="ts">
import { Cart } from '@/types/shopify'
import intersection from 'lodash/intersection'
import useOffers from '@/composables/useOffers'
import useProduct from '@/composables/useProduct'
import Offer from '@/components/Offer/Offer.vue'
import useFormatter from '@/composables/useFormatter'
import { Product } from '@/services/api/services/productService'
import { Offer as OfferType } from '@/services/api/services/offerService'
import { defineComponent, PropType, Ref, ref, watch, watchEffect } from 'vue'
import DividerLabel from '@/components/DividerLabel/DividerLabel.vue'
export default defineComponent({
  components: {
    Offer,
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
      offerData.value = await Promise.all(
        offers.value
          .filter(item => intersection(lineItemsAsProductIds, item.triggers).length)
          .map(async item => [item, await fetchProduct(item.productId)] as [OfferType, Product])
      )
    }
    watchEffect(fetchOfferData)
    watch(offerData, () => {
      console.log(offerData.value.length)
    })
    return { offerData }
  },
  methods: {
    handleClick() {
      console.log('hello')
    }
  }
})
</script>
