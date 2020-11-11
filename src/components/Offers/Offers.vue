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
      <CrossSell
        v-for="crossSell in filteredCrossSells"
        :id="crossSell.id"
        :cart-token="cartToken"
        :title="crossSell.title"
        :subtitle="crossSell.subtitle"
        :product-id="crossSell.productId"
        :image="crossSell.product.featuredImage.originalSrc"
        @click="handleClick(crossSell.productId)"
        :key="crossSell.id"
      />
    </CardLayout>
  </transition>
</template>

<script lang="ts">
import intersection from 'lodash/intersection'
import CrossSell from '@/components/CrossSell/CrossSell.vue'
import CardLayout from '@/components/CardLayout/CardLayout.vue'
import DividerLabel from '@/components/DividerLabel/DividerLabel.vue'
import { computed, defineComponent, PropType } from 'vue'
import useCrossSells from '@/composables/useCrossSells'
export default defineComponent({
  components: {
    CrossSell,
    CardLayout,
    DividerLabel
  },
  props: {
    lineItemsAsProductIds: {
      type: Array as PropType<string[]>,
      required: true
    },
    cartToken: {
      type: String,
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
