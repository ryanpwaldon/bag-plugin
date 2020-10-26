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
import intersection from 'lodash/intersection'
import useOffers from '@/composables/useOffers'
import useProduct from '@/composables/useProduct'
import Offer from '@/components/Offer/Offer.vue'
import CardLayout from '@/components/CardLayout/CardLayout.vue'
import DividerLabel from '@/components/DividerLabel/DividerLabel.vue'
import { Product } from '@/services/api/services/productService'
import { Offer as OfferType } from '@/services/api/services/offerService'
import { computed, defineComponent, PropType, Ref, ref, watchEffect } from 'vue'
export default defineComponent({
  components: {
    Offer,
    CardLayout,
    DividerLabel
  },
  props: {
    lineItemsAsProductIds: {
      type: Array as PropType<string[]>,
      required: true
    }
  },
  setup(props) {
    const { offers: allOffers } = useOffers()
    const { fetchProduct } = useProduct()
    const offers = computed(() => allOffers.value.filter(item => intersection(props.lineItemsAsProductIds, item.triggers).length))
    const products = computed(() => offers.value.map(item => fetchProduct(item.productId)))
    const offerData: Ref<[OfferType, Product][]> = ref([])
    watchEffect(async () => (offerData.value = (await Promise.all(products.value)).map((item, i) => [offers.value[i], item] as [OfferType, Product])))
    return { offerData }
  },
  methods: {
    handleClick() {
      console.log('hello')
    }
  }
})
</script>
