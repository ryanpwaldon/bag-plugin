<template>
  <div class="flex flex-col h-full">
    <Header title="Edit" class="flex-shrink-0 p-5 border-b border-gray-200" />
    <div class="relative grid gap-5 px-5 overflow-scroll auto-rows-max">
      <div class="w-full h-px" />
      <LineItem
        :title="lineItem.title"
        :price="lineItem.final_line_price"
        :options="lineItem.options_with_values"
        :image="lineItem.featured_image.url"
        :quantity="lineItem.quantity"
      />
      <Card>
        <InputNumber
          name="quantity"
          label="Quantity"
          :rules="
            $yup
              .number()
              .typeError('Quantity must be a number.')
              .required('Quantity is required.')
              .integer('Quantity cannot be a decimal.')
              .min(1, 'Quantity must be equal to 1 or more.')
          "
          :initial-value="lineItem.quantity"
        />
      </Card>
      <div class="w-full h-px" />
    </div>
    <div class="grid flex-shrink-0 gap-4 p-5 mt-auto border-t border-gray-200">
      <Button text="Save" theme="black" />
      <Button text="Back" theme="white" @click="$emit('route', { name: 'Home' })" />
    </div>
  </div>
</template>

<script lang="ts">
import Header from '@/components/Header/Header.vue'
import LineItem from '@/components/LineItem/LineItem.vue'
import Button from '@/components/Button/Button.vue'
import Card from '@/components/Card/Card.vue'
import InputNumber from '@/components/InputNumber/InputNumber.vue'
import { defineComponent, PropType } from 'vue'
import { LineItem as LineItemType } from '@/types/shopify'
export default defineComponent({
  components: {
    Header,
    LineItem,
    Button,
    Card,
    InputNumber
  },
  props: {
    lineItem: {
      type: Object as PropType<LineItemType>,
      required: true
    }
  },
  mounted() {
    console.log(this.lineItem)
  }
})
</script>
