<template>
  <div class="flex flex-col h-full">
    <Header title="Your Cart" :meta="cart && `${cart.item_count} items`" />
    <div class="relative flex-1 overflow-scroll">
      <transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <CardLayout v-if="!cart" class="absolute top-0 left-0 w-full h-full">
          <LoaderCard v-for="n in 3" :key="n" />
        </CardLayout>
        <CardLayout v-else>
          <LineItem
            :key="i"
            v-for="(lineItem, i) in lineItems"
            :title="lineItem.product_title"
            :quantity="lineItem.quantity"
            :image="lineItem.featured_image.url"
            :options="lineItem.options_with_values"
            :has-options="!lineItem.product_has_only_default_variant"
            :price="cart && formatter.currency(lineItem.final_line_price, cart.currency)"
            @click="$emit('route', { name: 'Edit', props: { lineItem, currencyCode: cart && cart.currency } })"
          />
          <Offers :cart="cart" />
        </CardLayout>
      </transition>
    </div>
    <div class="grid flex-shrink-0 gap-4 p-5 border-t border-gray-200">
      <Balance :subtotal="cart && formatter.currency(cart.total_price, cart.currency)" />
      <Button text="Checkout" theme="black" />
    </div>
  </div>
</template>

<script lang="ts">
import Header from '@/components/Header/Header.vue'
import LineItem from '@/components/LineItem/LineItem.vue'
import Offers from '@/components/Offers/Offers.vue'
import Balance from '@/components/Balance/Balance.vue'
import Button from '@/components/Button/Button.vue'
import LoaderCard from '@/components/LoaderCard/LoaderCard.vue'
import CardLayout from '@/components/CardLayout/CardLayout.vue'
import { computed, defineComponent, PropType, Ref, ref } from 'vue'
import { Offer as OfferInterface } from '@/services/api/services/offerService'
import { comms } from '@/services/comms/comms'
import { Cart } from '@/types/shopify'
import useFormatter from '@/composables/useFormatter'
export default defineComponent({
  components: {
    Header,
    LineItem,
    Offers,
    Balance,
    Button,
    LoaderCard,
    CardLayout
  },
  props: {
    initialCart: {
      type: Object as PropType<Cart>,
      required: false
    }
  },
  setup(props) {
    const { formatter } = useFormatter()
    const cart: Ref<Cart | null> = ref(props.initialCart || null)
    const lineItems = computed(() => cart.value?.items || [])
    const offers: Ref<OfferInterface[]> = ref([])
    const fetchCart = async () => (cart.value = await (await comms).getCart())
    if (!cart.value) fetchCart()
    return { cart, lineItems, offers, formatter }
  }
})
</script>
