<template>
  <div class="flex flex-col h-full">
    <Header title="Edit" class="flex-shrink-0 p-5 border-b border-gray-200" />
    <div class="relative grid flex-1 gap-5 px-5 overflow-scroll auto-rows-max">
      <div class="w-full h-px" />
      <LineItem
        :title="lineItem.product_title"
        :price="lineItem.final_line_price"
        :options="lineItem.options_with_values"
        :image="lineItem.featured_image.url"
        :quantity="lineItem.quantity"
      />
      <template v-if="loading">
        <LoaderCard v-for="n in 2" :key="n" />
      </template>
      <Card v-else class="grid gap-4">
        <InputNumber
          name="quantity"
          label="Quantity"
          :initial-value="lineItem.quantity"
          :rules="
            $yup
              .number()
              .typeError('Quantity must be a number.')
              .required('Quantity is required.')
              .integer('Quantity cannot be a decimal.')
              .min(1, 'Quantity must be equal to 1 or more.')
          "
        />
        <InputVariant
          name="variant"
          label="Variant"
          :initial-value="lineItem.variant_id"
          :variants="variants"
          :rules="
            $yup
              .string()
              .typeError('Variant must be a string.')
              .required('Variant is required.')
          "
        />
      </Card>
      <div class="w-full h-px" />
    </div>
    <div class="grid flex-shrink-0 gap-4 p-5 border-t border-gray-200">
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
import LoaderCard from '@/components/LoaderCard/LoaderCard.vue'
import InputVariant from '@/components/InputVariant/InputVariant.vue'
import { computed, defineComponent, PropType, ref, Ref, watchEffect } from 'vue'
import { LineItem as LineItemType, Product } from '@/types/shopify'
import { comms } from '@/services/comms/comms'
export default defineComponent({
  components: {
    Header,
    LineItem,
    Button,
    Card,
    InputNumber,
    LoaderCard,
    InputVariant
  },
  props: {
    lineItem: {
      type: Object as PropType<LineItemType>,
      required: true
    }
  },
  setup(props) {
    const loading = ref(false)
    const product: Ref<Product | null> = ref(null)
    const variants = computed(
      () =>
        product.value?.variants.map(item => ({
          id: item.id,
          name: item.title,
          inStock: item.available
        })) || []
    )
    const fetchProduct = async () => {
      loading.value = true
      const { getProduct } = await comms
      product.value = await getProduct(props.lineItem.handle)
      loading.value = false
    }
    watchEffect(fetchProduct)
    return { product, variants, loading, fetchProduct }
  }
})
</script>
