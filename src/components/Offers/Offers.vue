<template>
  <transition
    enter-active-class="transition duration-150 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div class="space-y-6" v-if="filteredCrossSells.length">
      <p class="z-20 font-medium leading-6 text-gray-900 transition ease-in-out">{{ $copy.offersTitle }}</p>
      <CrossSell
        v-for="crossSell in filteredCrossSells"
        :id="crossSell.id"
        :cart-token="cartToken"
        :title="crossSell.title"
        :subtitle="crossSell.subtitle"
        :product-id="crossSell.productId"
        :image="crossSell.product.featured_image"
        @click="handleClick(crossSell.productId)"
        :key="crossSell.id"
      />
    </div>
  </transition>
</template>

<script lang="ts">
import intersection from 'lodash/intersection'
import CrossSell from '@/components/CrossSell/CrossSell.vue'
import { computed, defineComponent, PropType } from 'vue'
import useCrossSells from '@/composables/useCrossSells'
export default defineComponent({
  components: {
    CrossSell
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
