<template>
  <div class="flex flex-col h-full">
    <Header title="Your Cart" :meta="`${2} items`" />
    <div class="relative flex-1 overflow-scroll">
      <transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <CardLayout v-if="loading" class="absolute top-0 left-0 w-full h-full">
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
            :price="$formatter.currency(lineItem.final_line_price, cart && cart.currency)"
            @click="$emit('route', { name: 'Edit', props: { lineItem, currencyCode: cart && cart.currency } })"
          />
          <DividerLabel text="Offers" class="z-20 py-1" />
          <Offer
            title="Add a pencil"
            subtitle="Only $4.99"
            image="https://cdn.shopify.com/s/files/1/0277/3070/6514/products/CR-9020_large.jpg?v=159244352733"
            quantity="2"
          />
          <Offer
            title="Add an infuser lid"
            subtitle="Only $24.99"
            image="https://cdn.shopify.com/s/files/1/0277/3070/6514/products/TB-8051513924095.01.jpg?v=1589864316"
            quantity="2"
          />
        </CardLayout>
      </transition>
    </div>
    <div class="grid flex-shrink-0 gap-4 p-5 border-t border-gray-200">
      <Balance subtotal="$109.00" />
      <Button text="Checkout" theme="black" />
    </div>
  </div>
</template>

<script lang="ts">
import Header from '@/components/Header/Header.vue'
import LineItem from '@/components/LineItem/LineItem.vue'
import Offer from '@/components/Offer/Offer.vue'
import Balance from '@/components/Balance/Balance.vue'
import Button from '@/components/Button/Button.vue'
import DividerLabel from '@/components/DividerLabel/DividerLabel.vue'
import LoaderCard from '@/components/LoaderCard/LoaderCard.vue'
import CardLayout from '@/components/CardLayout/CardLayout.vue'
import { Cart } from '@/types/shopify'
import { comms } from '@/services/comms/comms'
import { computed, defineComponent, Ref, ref, watchEffect } from 'vue'
export default defineComponent({
  components: {
    Header,
    LineItem,
    Offer,
    Balance,
    Button,
    DividerLabel,
    LoaderCard,
    CardLayout
  },
  setup() {
    const loading = ref(false)
    const cart: Ref<Cart | null> = ref(null)
    const lineItems = computed(() => cart.value?.items || [])
    const fetchCart = async () => {
      loading.value = true
      const { getCart } = await comms
      cart.value = await getCart()
      loading.value = false
      console.log(cart)
    }
    watchEffect(fetchCart)
    return { cart, lineItems, loading, fetchCart }
  }
})
</script>
