<template>
  <form class="flex flex-col h-full" @submit.prevent="handleSubmit(submit)">
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
            :quantity="values.quantity"
            :image="lineItem.featured_image.url"
            :options="selectedVariantOptions"
            :hide-options="lineItem.product_has_only_default_variant"
            :price="selectedVariant && formatter.currency((selectedVariant.price / 100) * values.quantity, currencyCode)"
            edit-mode
          />
          <Card class="grid gap-4">
            <InputListbox
              label="Type"
              :value="values.variantId"
              :error="errors.variantId"
              :options="variantIdListboxOptions"
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
            <div class="flex flex-col items-start">
              <p class="block text-sm font-medium leading-5 text-true-gray-700">Remove</p>
              <Button class="w-full mt-1" text="Remove from cart" theme="white-outline" size="md" @click="removeFromCart" />
            </div>
          </Card>
        </CardLayout>
        <CardLayout v-else class="absolute top-0 left-0 w-full h-full">
          <LoaderCard />
        </CardLayout>
      </transition>
    </Scroller>
    <div class="grid flex-shrink-0 gap-4 p-6 mt-auto border-t border-true-gray-200">
      <Button type="submit" text="Save" theme="black" />
      <Button text="Back to cart" theme="white-outline" @click="$emit('route', { name: 'Home' })" />
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
import InputListbox, { ListboxOption } from '@/components/InputListbox/InputListbox.vue'
import useFormatter from '@/composables/useFormatter'
import useForm from '@/composables/useForm'
import { parentFrame } from '@/services/parent-frame/parent-frame'
import { number, object, string } from 'yup'
import { defineComponent, PropType } from 'vue'
import { AjaxCart, AjaxLineItem, AjaxProduct, AjaxVariant } from '@/types/ajaxApi'
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
      type: Object as PropType<AjaxLineItem>,
      required: true
    },
    currencyCode: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { formatter } = useFormatter()
    const { values, defaults, errors, modified, updateValue, handleSubmit } = useForm(
      object({
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
    )
    return {
      values,
      defaults,
      errors,
      modified,
      updateValue,
      handleSubmit,
      formatter
    }
  },
  async created() {
    this.product = await (await parentFrame).getProduct(this.lineItem.handle)
  },
  data: () => ({
    product: null as AjaxProduct | null
  }),
  computed: {
    selectedVariant(): AjaxVariant | undefined {
      return this.lineItem?.product_has_only_default_variant
        ? this.product?.variants[0]
        : this.product?.variants.find(item => item.id.toString() === this.values.variantId)
    },
    selectedVariantOptions(): Record<string, string | undefined>[] {
      return this.product?.options.map(({ name }, i) => ({ name, value: this.selectedVariant?.options[i] })) || []
    },
    variantIdListboxOptions(): ListboxOption[] {
      if (!this.product) return []
      return this.product.variants.map(item => ({
        id: item.id.toString(),
        title: item.title,
        meta: this.formatter.currency(item.price / 100, this.currencyCode),
        disabled: !item.available
      }))
    }
  },
  methods: {
    async submit() {
      const { variantId, quantity } = this.values
      const { addToCart, changeLineItemQuantity } = await parentFrame
      const variantIdWasModified = variantId !== this.defaults.variantId
      const quantityWasModified = quantity !== this.defaults.quantity
      if (variantIdWasModified) {
        await addToCart(variantId, quantity)
        const cart = await changeLineItemQuantity(this.lineItem.key, 0)
        this.returnToCart(cart)
      } else if (quantityWasModified) {
        const cart = await changeLineItemQuantity(this.lineItem.key, quantity)
        this.returnToCart(cart)
      } else {
        this.returnToCart()
      }
    },
    async removeFromCart() {
      const { changeLineItemQuantity } = await parentFrame
      const cart = await changeLineItemQuantity(this.lineItem.key, 0)
      this.returnToCart(cart)
    },
    returnToCart(cart?: AjaxCart) {
      this.$emit('route', { name: 'Home', props: { initialCart: cart } })
    }
  }
})
</script>
