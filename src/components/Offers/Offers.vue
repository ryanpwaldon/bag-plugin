<template>
  <transition
    enter-active-class="transition duration-150 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <CardLayout v-if="filteredCrossSells.length">
      <DividerLabel text="Offers" class="z-20 py-1 transition ease-in-out" />
      <Offer
        :key="crossSell.id"
        v-for="crossSell in filteredCrossSells"
        :title="crossSell.title"
        :subtitle="crossSell.subtitle"
        :image="crossSell.product.featuredImage.originalSrc"
        @click="handleClick(crossSell.productId)"
      />
    </CardLayout>
  </transition>
</template>

<script lang="ts">
import intersection from 'lodash/intersection'
import Offer from '@/components/Offer/Offer.vue'
import CardLayout from '@/components/CardLayout/CardLayout.vue'
import DividerLabel from '@/components/DividerLabel/DividerLabel.vue'
import { computed, defineComponent, PropType } from 'vue'
import useCrossSells from '@/composables/useCrossSells'
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
    const { crossSells } = useCrossSells()
    const filteredCrossSells = computed(() =>
      crossSells.value.filter(
        item => intersection(props.lineItemsAsProductIds, item.triggerProductIds).length && !props.lineItemsAsProductIds.includes(item.productId)
      )
    )
    return { filteredCrossSells }
  },
  methods: {
    handleClick(productId: string) {
      this.$emit('route', { name: 'Add', props: { productId, currencyCode: this.currencyCode } })
    }
  }
})
</script>
