<template>
  <form class="flex flex-col h-full" @submit="handleSubmit">
    <Header :title="$copy.editTitle" :close="returnToCart" />
    <Scroller>
      <Fade>
        <div class="space-y-6" v-if="product">
          <LineItem
            :title="lineItem.product_title"
            :quantity="fields.quantity.value.value"
            :image="lineItemImage"
            :options="selectedVariantOptions"
            :hide-options="lineItem.product_has_only_default_variant"
            :price="selectedVariant && formatter.currency((selectedVariant.price / 100) * fields.quantity.value.value, currencyCode)"
            :relative-link="lineItem.url"
            edit-mode
          />
          <Card>
            <InputListbox
              :label="$copy.type"
              class="z-10"
              :options="variantIdListboxOptions"
              :error="fields.variantId.error.value"
              v-model="fields.variantId.value.value"
              v-if="!lineItem.product_has_only_default_variant"
            />
            <InputNumber name="quantity" :label="$copy.quantity" v-model="fields.quantity.value.value" :error="fields.quantity.error.value" />
            <div class="flex flex-col items-start">
              <p class="block text-sm font-medium leading-5 text-gray-700">{{ $copy.remove }}</p>
              <Button class="w-full mt-1" :text="$copy.removeButton" theme="white" size="md" @click="removeFromCart" />
            </div>
          </Card>
        </div>
        <LoaderCard class="absolute top-0 left-0" v-else />
      </Fade>
    </Scroller>
    <div class="grid flex-shrink-0 gap-4 p-6 mt-auto bg-gray-100 border-t border-gray-300 border-dashed">
      <Button type="submit" :text="$copy.saveButton" />
      <Button :text="$copy.backToCartButton" theme="white" @click="$emit('route', { name: 'Home' })" />
    </div>
  </form>
</template>

<script lang="ts">
import useForm from '@/composables/useForm'
import { number, object, string } from 'yup'
import Card from '@/components/Card/Card.vue'
import Fade from '@/components/Fade/Fade.vue'
import { defineComponent, PropType } from 'vue'
import Header from '@/components/Header/Header.vue'
import Button from '@/components/Button/Button.vue'
import useFormatter from '@/composables/useFormatter'
import Scroller from '@/components/Scroller/Scroller.vue'
import LineItem from '@/components/LineItem/LineItem.vue'
import useParentFrame from '@/composables/useParentFrame'
import LoaderCard from '@/components/LoaderCard/LoaderCard.vue'
import InputNumber from '@/components/InputNumber/InputNumber.vue'
import { AjaxCart, AjaxLineItem, AjaxProduct, AjaxVariant } from '@/types/ajaxApi'
import InputListbox, { ListboxOption } from '@/components/InputListbox/InputListbox.vue'
export default defineComponent({
  components: {
    Fade,
    Card,
    Button,
    Header,
    Scroller,
    LineItem,
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
  setup(props, { emit }) {
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
    const { fields, handleSubmit } = useForm(schema)
    const returnToCart = (cart?: AjaxCart) => emit('route', { name: 'Home', props: { initialCart: cart } })
    const { parentFrame } = useParentFrame()
    const onSubmit = async () => {
      const { variantId, quantity } = fields
      if (variantId.modified.value) {
        await parentFrame.value.addToCart(variantId.value.value, quantity.value.value)
        const cart = await parentFrame.value.changeLineItemQuantity(props.lineItem.key, 0)
        returnToCart(cart)
      } else if (quantity.modified.value) {
        const cart = await parentFrame.value.changeLineItemQuantity(props.lineItem.key, quantity.value.value)
        returnToCart(cart)
      } else {
        returnToCart()
      }
    }
    const { formatter } = useFormatter()
    return {
      fields,
      formatter,
      parentFrame,
      returnToCart,
      handleSubmit: handleSubmit(onSubmit)
    }
  },
  async created() {
    this.product = await this.parentFrame.getProductByHandle(this.lineItem.handle)
  },
  data: () => ({
    product: null as AjaxProduct | null
  }),
  computed: {
    lineItemImage(): string | null {
      return this.selectedVariant?.featured_image?.src || this.product?.featured_image || null
    },
    selectedVariant(): AjaxVariant | undefined {
      return this.lineItem?.product_has_only_default_variant
        ? this.product?.variants[0]
        : this.product?.variants.find(item => item.id.toString() === this.fields.variantId.value.value)
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
    async removeFromCart() {
      const cart = await this.parentFrame.changeLineItemQuantity(this.lineItem.key, 0)
      this.returnToCart(cart)
    }
  }
})
</script>
