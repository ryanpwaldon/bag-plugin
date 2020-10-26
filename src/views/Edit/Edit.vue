<template>
  <form class="flex flex-col h-full" @submit="submit">
    <Header title="Edit item" :close="returnToCart" />
    <Scroller>
      <transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <CardLayout v-if="product">
          <LineItem
            :title="lineItem.product_title"
            :quantity="lineItem.quantity"
            :image="lineItem.featured_image.url"
            :options="lineItem.options_with_values"
            :has-options="!lineItem.product_has_only_default_variant"
            :price="formatter.currency(lineItem.final_line_price, currencyCode)"
            edit-mode
          />
          <Card class="grid gap-4">
            <InputListbox
              label="Type"
              :value="values.variantId"
              :options="variantOptions"
              :error="errors.variantId"
              @update="updateValue('variantId', $event)"
              v-if="!lineItem.product_has_only_default_variant"
              class="z-10"
            />
            <InputNumber
              name="quantity"
              label="Quantity"
              :value="values.quantity"
              @update="updateValue('quantity', $event)"
              :error="errors.quantity"
            />
            <div>
              <p class="block text-sm font-medium leading-5 text-gray-700">Remove</p>
              <Button class="w-full mt-1" text="Remove from cart" theme="white-outline" size="md" @click="removeFromCart" />
            </div>
          </Card>
        </CardLayout>
        <CardLayout v-else class="absolute top-0 left-0 w-full h-full">
          <LoaderCard />
        </CardLayout>
      </transition>
    </Scroller>
    <div class="grid flex-shrink-0 gap-4 p-5 mt-auto border-t border-gray-200">
      <Button type="submit" text="Save" theme="black" />
      <Button text="Go back" theme="white" @click="$emit('route', { name: 'Home' })" />
    </div>
  </form>
</template>

<script lang="ts">
import Card from '@/components/Card/Card.vue'
import Header from '@/components/Header/Header.vue'
import Button from '@/components/Button/Button.vue'
import Scroller from '@/components/Scroller/Scroller.vue'
import LineItem from '@/components/LineItem/LineItem.vue'
import LoaderCard from '@/components/LoaderCard/LoaderCard.vue'
import CardLayout from '@/components/CardLayout/CardLayout.vue'
import InputNumber from '@/components/InputNumber/InputNumber.vue'
import InputListbox, { Option } from '@/components/InputListbox/InputListbox.vue'
import { computed, ComputedRef, defineComponent, PropType, ref, Ref, watchEffect } from 'vue'
import { Cart, LineItem as LineItemType, Product } from '@/types/shopify'
import useFormatter from '@/composables/useFormatter'
import { comms } from '@/services/comms/comms'
import useForm from '@/composables/useForm'
import { number, object, string } from 'yup'
export default defineComponent({
  components: {
    Card,
    Button,
    Header,
    Scroller,
    LineItem,
    CardLayout,
    LoaderCard,
    InputNumber,
    InputListbox
  },
  props: {
    lineItem: {
      type: Object as PropType<LineItemType>,
      required: true
    },
    currencyCode: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const { formatter } = useFormatter()
    const product: Ref<Product | null> = ref(null)
    const variantOptions: ComputedRef<Option[]> = computed(
      () =>
        product.value?.variants.map(item => ({
          id: item.id.toString(),
          title: item.title,
          meta: formatter.currency(item.price, props.currencyCode),
          disabled: !item.available
        })) || []
    )
    watchEffect(async () => (product.value = await (await comms).getProduct(props.lineItem.handle)))
    const schema = object({
      quantity: number()
        .typeError('Quantity must be a number.')
        .required('Quantity is required.')
        .integer('Quantity cannot be a decimal.')
        .min(1, 'Quantity must be equal to 1 or more.')
        .default(props.lineItem.quantity),
      variantId: string()
        .typeError('Type is required.')
        .required('Type is required.')
        .default(props.lineItem.variant_id)
    }).defined()
    const { values, errors, modified, updateValue, submit, onSuccessfulSubmit } = useForm(schema)
    const returnToCart = (cart: Cart) => emit('route', { name: 'Home', props: { initialCart: cart } })
    onSuccessfulSubmit(async ({ quantity, variantId }, defaults) => {
      const { addToCart, changeLineItemQuantity } = await comms
      if (variantId !== defaults.variantId) {
        await addToCart(variantId, quantity)
        const cart = await changeLineItemQuantity(props.lineItem.key, 0)
        returnToCart(cart)
      } else if (quantity !== defaults.quantity) {
        const cart = await changeLineItemQuantity(props.lineItem.key, quantity)
        returnToCart(cart)
      }
    })
    const removeFromCart = async () => {
      const { changeLineItemQuantity } = await comms
      const cart = await changeLineItemQuantity(props.lineItem.key, 0)
      returnToCart(cart)
    }
    return {
      product,
      values,
      errors,
      modified,
      updateValue,
      returnToCart,
      variantOptions,
      removeFromCart,
      formatter,
      submit
    }
  }
})
</script>
