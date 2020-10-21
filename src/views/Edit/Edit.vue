<template>
  <Form class="flex flex-col h-full" @submit="handleSubmit">
    <Header title="Back to Cart" :back="() => $emit('route', { name: 'Home' })" />
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
          <LoaderCard v-for="n in 2" :key="n" />
        </CardLayout>
        <CardLayout v-else>
          <LineItem
            edit-mode
            :title="lineItem.product_title"
            :quantity="lineItem.quantity"
            :image="lineItem.featured_image.url"
            :options="lineItem.options_with_values"
            :price="$formatter.currency(lineItem.final_line_price, currencyCode)"
          />
          <Card class="grid gap-4">
            <InputNumber
              name="quantity"
              label="Quantity"
              :initial-value="initialValues.quantity"
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
              :initial-value="initialValues.variant"
              :variants="variants"
              :rules="
                $yup
                  .string()
                  .typeError('Variant must be a string.')
                  .required('Variant is required.')
              "
            />
          </Card>
        </CardLayout>
      </transition>
    </div>
    <div class="grid flex-shrink-0 gap-4 p-5 mt-auto border-t border-gray-200">
      <Button type="submit" text="Save" theme="black" />
      <Button text="Cancel" theme="white" @click="$emit('route', { name: 'Home' })" />
    </div>
  </Form>
</template>

<script lang="ts">
import Card from '@/components/Card/Card.vue'
import Header from '@/components/Header/Header.vue'
import Button from '@/components/Button/Button.vue'
import LineItem from '@/components/LineItem/LineItem.vue'
import LoaderCard from '@/components/LoaderCard/LoaderCard.vue'
import CardLayout from '@/components/CardLayout/CardLayout.vue'
import InputNumber from '@/components/InputNumber/InputNumber.vue'
import InputVariant from '@/components/InputVariant/InputVariant.vue'
import { computed, defineComponent, PropType, ref, Ref, watchEffect } from 'vue'
import { LineItem as LineItemType, Product } from '@/types/shopify'
import { comms } from '@/services/comms/comms'
import { Form } from 'vee-validate'
export default defineComponent({
  components: {
    Form,
    Card,
    Button,
    Header,
    LineItem,
    CardLayout,
    LoaderCard,
    InputNumber,
    InputVariant
  },
  props: {
    initialLineItem: {
      type: Object as PropType<LineItemType>,
      required: true
    },
    currencyCode: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const loading = ref(false)
    const product: Ref<Product | null> = ref(null)
    const lineItem = ref(Object.assign({}, props.initialLineItem))
    const variants = computed(
      () =>
        product.value?.variants.map(item => ({
          id: item.id,
          name: item.title,
          inStock: item.available
        })) || []
    )
    const initialValues = computed(() => ({
      quantity: lineItem.value.quantity,
      variant: lineItem.value.variant_id
    }))
    watchEffect(async () => {
      loading.value = true
      const { getProduct } = await comms
      product.value = await getProduct(lineItem.value.handle)
      loading.value = false
    })
    const handleSubmit = async ({ quantity, variant }: typeof initialValues.value) => {
      const { addToCart, changeLineItemQuantity } = await comms
      if (variant !== initialValues.value.variant) {
        await changeLineItemQuantity(lineItem.value.key, 0)
        const newLineItem = await addToCart(variant, quantity)
        lineItem.value = newLineItem
      } else if (quantity !== initialValues.value.quantity) {
        const cart = await changeLineItemQuantity(lineItem.value.key, quantity)
        const newLineItem = cart.items.find(item => item.key === lineItem.value.key) as LineItemType
        lineItem.value = newLineItem
      }
    }
    return { loading, lineItem, product, variants, initialValues, handleSubmit }
  }
})
</script>
