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
import { ServerProduct } from '@/services/api/services/productService'
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
    const { offers } = useOffers()
    const { fetchProduct } = useProduct()
    const filteredOffers = computed(() => offers.value.filter(item => intersection(props.lineItemsAsProductIds, item.triggers).length))
    const filteredProducts = computed(() => filteredOffers.value.map(item => fetchProduct(item.productId)))
    const offerData: Ref<[OfferType, ServerProduct][]> = ref([])
    const updateOfferData = async () => {
      const products = await Promise.all(filteredProducts.value)
      offerData.value = offers.value.map((item, i) => [item, products[i]] as [OfferType, ServerProduct])
    }
    watchEffect(updateOfferData)
    return { offerData }
  },
  methods: {
    handleClick() {
      console.log('hello')
    }
  }
})
</script>
