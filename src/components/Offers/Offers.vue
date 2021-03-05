<template>
  <Fade>
    <div class="space-y-6" v-if="filteredCrossSells.length">
      <p class="z-20 font-medium leading-6 text-gray-900 transition ease-in-out pointer-events-none">{{ $copy.offersTitle }}</p>
      <Reward
        v-for="reward in incompleteRewards"
        :id="reward.id"
        :subtotal="subtotal"
        :min-spend="reward.minSpend"
        :currency-code="currencyCode"
        :cart-token="cartToken"
        :title="reward.title"
        :image="reward.image"
        :key="reward.id"
      />
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
      <Reward
        v-for="reward in completeRewards"
        :id="reward.id"
        :subtotal="subtotal"
        :min-spend="reward.minSpend"
        :currency-code="currencyCode"
        :cart-token="cartToken"
        :title="reward.title"
        :image="reward.image"
        :key="reward.id"
      />
    </div>
  </Fade>
</template>

<script lang="ts">
import intersection from 'lodash/intersection'
import CrossSell from '@/components/CrossSell/CrossSell.vue'
import { defineComponent, PropType } from 'vue'
import useCrossSells from '@/composables/useCrossSells'
import Reward from '@/components/Reward/Reward.vue'
import Fade from '@/components/Fade/Fade.vue'
import useRewards from '@/composables/useRewards'
import { Reward as RewardType } from '@/services/api/services/rewardService'
import { CrossSell as CrossSellType } from '@/services/api/services/crossSellService'
export default defineComponent({
  components: {
    CrossSell,
    Reward,
    Fade
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
    },
    subtotal: {
      type: Number,
      required: true
    }
  },
  setup() {
    const { rewards } = useRewards()
    const { crossSells } = useCrossSells()
    return { crossSells, rewards }
  },
  computed: {
    filteredCrossSells(): CrossSellType[] {
      return this.crossSells.filter(
        item => intersection(this.lineItemsAsProductIds, item.triggerProductIds).length && !this.lineItemsAsProductIds.includes(item.productId)
      )
    },
    completeRewards(): RewardType[] {
      return this.rewards.filter(item => item.minSpend - this.subtotal <= 0).sort((a, b) => a.minSpend - b.minSpend)
    },
    incompleteRewards(): RewardType[] {
      return this.rewards.filter(item => item.minSpend - this.subtotal > 0).sort((a, b) => a.minSpend - b.minSpend)
    }
  },
  methods: {
    handleClick(productId: string) {
      this.$emit('route', { name: 'Add', props: { productId, currencyCode: this.currencyCode } })
    }
  }
})
</script>
