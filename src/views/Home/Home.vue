<template>
  <div class="flex flex-col h-full">
    <Header title="Your Cart" :meta="`${2} items`" class="flex-shrink-0 p-5 pb-0" />
    <div class="relative overflow-scroll">
      <div class="sticky top-0 z-10 w-full h-5 bg-gradient-to-b from-gray-50 via-gray-50" />
      <div class="grid gap-5 px-5 auto-rows-max">
        <LineItem
          title="Georgia"
          price="$99.00"
          original-price="$109.00"
          :variants="[{ name: 'Color', value: 'Cream' }]"
          image="https://cdn.shopify.com/s/files/1/0277/3070/6514/products/MG-2021_AGENDA_A5_ART_01.jpg?"
          quantity="2"
        />
        <LineItem
          title="Georgia"
          price="$99.00"
          original-price="$109.00"
          :variants="[
            { name: 'Color', value: 'Black' },
            { name: 'Size', value: 'A4' }
          ]"
          image="https://cdn.shopify.com/s/files/1/0277/3070/6514/products/MG-2021_AGENDA_A5_ART_01.jpg?"
          quantity="1"
        />
        <LineItem
          title="Georgia"
          price="$99.00"
          original-price="$109.00"
          :variants="[
            { name: 'Color', value: 'Cream' },
            { name: 'Size', value: '36' }
          ]"
          image="https://cdn.shopify.com/s/files/1/0277/3070/6514/products/MG-2021_AGENDA_A5_ART_01.jpg?"
          quantity="2"
        />
      </div>
      <div class="sticky bottom-0 z-10 w-full h-5 bg-gradient-to-t from-gray-50 via-gray-50" />
    </div>
    <div class="grid flex-shrink-0 gap-4 p-5 pt-0 mt-auto">
      <Balance subtotal="$109.00" />
      <Button text="Checkout" theme="black" />
    </div>
  </div>
</template>

<script lang="ts">
import Header from '@/components/Header/Header.vue'
import LineItem from '@/components/LineItem/LineItem.vue'
import Balance from '@/components/Balance/Balance.vue'
import Button from '@/components/Button/Button.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    Header,
    LineItem,
    Balance,
    Button
  }
})
</script>
