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
        :image="product.featuredImage.originalSrc"
        @click="handleClick(offer.productId)"
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
import { ServerOffer, ServerProduct } from '@/types/serverApi'
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
    },
    currencyCode: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { offers } = useOffers()
    const { fetchProduct } = useProduct()
    const filteredOffers = computed(() => offers.value.filter(item => intersection(props.lineItemsAsProductIds, item.triggers).length))
    const filteredProducts = computed(() => filteredOffers.value.map(item => fetchProduct(item.productId)))
    const offerData: Ref<[ServerOffer, ServerProduct][]> = ref([])
    const updateOfferData = async () => {
      const products = await Promise.all(filteredProducts.value)
      offerData.value = offers.value.map((item, i) => [item, products[i]] as [ServerOffer, ServerProduct])
    }
    watchEffect(updateOfferData)
    return { offerData }
  },
  methods: {
    handleClick(productId: string) {
      this.$emit('route', { name: 'Add', props: { productId, currencyCode: this.currencyCode } })
    }
  }
})
</script>
