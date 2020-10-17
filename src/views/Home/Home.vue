<template>
  <div class="flex flex-col h-full">
    <Header title="Your Cart" :meta="`${2} items`" class="flex-shrink-0 p-5 border-b border-gray-200" />
    <div class="relative overflow-scroll">
      <div class="sticky top-0 z-10 w-full h-5" />
      <div class="grid gap-5 px-5 auto-rows-max">
        <LineItem
          title="2021 Studio Art Diary"
          price="$44.95"
          :variants="[{ name: 'Size', value: 'A4' }]"
          image="https://cdn.shopify.com/s/files/1/0277/3070/6514/products/MG-2021_AGENDA_A5_ART_01.jpg?"
          quantity="1"
        />
        <LineItem
          title="Urban Monochrome Drink Bottle"
          price="$34.95"
          original-price="$44.95"
          :variants="[
            { name: 'Color', value: 'Black' },
            { name: 'Size', value: '500ml' }
          ]"
          image="https://cdn.shopify.com/s/files/1/0277/3070/6514/products/TB-8051513920066.01.jpg?v=1592390773"
          quantity="2"
        />
        <DividerLabel text="Offers" class="z-20 py-5" />
        <Offer
          title="Add a graphite pencil"
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
      </div>
      <div class="sticky bottom-0 z-10 w-full h-5" />
    </div>
    <div class="grid flex-shrink-0 gap-4 p-5 mt-auto border-t border-gray-200">
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
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    Header,
    LineItem,
    Offer,
    Balance,
    Button,
    DividerLabel
  }
})
</script>
