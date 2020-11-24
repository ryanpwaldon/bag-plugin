<template>
  <form class="flex flex-col h-full" @submit="handleSubmit">
    <Header title="Add to cart" :close="returnToCart" />
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
            :title="product.title"
            :image="lineItemImage"
            :quantity="fields.quantity.value.value"
            :options="selectedVariantOptions"
            :hide-options="product.hasOnlyDefaultVariant"
            :price="selectedVariant && formatter.currency(selectedVariant.price * fields.quantity.value.value, currencyCode)"
            :relative-link="`/products/${product.handle}?variant=${selectedVariant?.legacyResourceId}`"
            edit-mode
          />
          <Card class="grid gap-4">
            <InputListbox
              class="z-10"
              label="Type"
              :options="variantIdListboxOptions"
              :error="fields.variantId.error.value"
              v-if="!product.hasOnlyDefaultVariant"
              v-model="fields.variantId.value.value"
            />
            <InputNumber name="quantity" label="Quantity" v-model="fields.quantity.value.value" :error="fields.quantity.error.value" />
          </Card>
        </CardLayout>
        <CardLayout v-else class="absolute top-0 left-0 w-full h-full">
          <LoaderCard />
        </CardLayout>
      </transition>
    </Scroller>
    <div class="grid flex-shrink-0 gap-4 p-6 mt-auto bg-white border-t border-true-gray-200">
      <Button type="submit" text="Add to cart" theme="black" />
      <Button text="Cancel" theme="whiteOutlined" @click="$emit('route', { name: 'Home' })" />
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
import productService from '@/services/api/services/productService'
import useFormatter from '@/composables/useFormatter'
import useForm from '@/composables/useForm'
import { number, object, string } from 'yup'
import { defineComponent } from 'vue'
import { parentFrame } from '@/services/parent-frame/parent-frame'
import { ServerProduct, ServerVariant } from '@/types/serverApi'
import { AjaxCart } from '@/types/ajaxApi'
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
    productId: {
      type: String,
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
        .default(1),
      variantId: string()
        .typeError('Type is required.')
        .required('Type is required.')
    }).defined()
    const { fields, modified, getValues, handleSubmit } = useForm(schema)
    const { formatter } = useFormatter()
    const returnToCart = (cart?: AjaxCart) => emit('route', { name: 'Home', props: { initialCart: cart } })
    const onSubmit = async () => {
      const { addToCart } = await parentFrame
      const { variantId, quantity } = getValues()
      await addToCart(variantId, quantity)
      returnToCart()
    }
    return {
      fields,
      modified,
      formatter,
      getValues,
      returnToCart,
      handleSubmit: handleSubmit(onSubmit)
    }
  },
  async created() {
    this.product = await productService.findOne(this.productId)
    this.fields.variantId.value.value = this.variants[0].legacyResourceId
  },
  data: () => ({
    product: null as ServerProduct | null
  }),
  computed: {
    lineItemPrice(): string | null {
      return this.selectedVariant?.image?.originalSrc || this.product?.featuredImage?.originalSrc || null
    },
    lineItemImage(): string | null {
      return this.selectedVariant?.image?.originalSrc || this.product?.featuredImage?.originalSrc || null
    },
    variants(): ServerVariant[] {
      return this.product?.variants.edges.map(item => item.node) || []
    },
    selectedVariant(): ServerVariant | null {
      return this.variants.find(item => item.legacyResourceId === this.fields.variantId.value.value) || null
    },
    selectedVariantOptions(): Record<string, string>[] {
      return this.selectedVariant?.selectedOptions || []
    },
    variantIdListboxOptions(): ListboxOption[] {
      return this.variants.map(item => ({
        id: item.legacyResourceId,
        title: item.title,
        meta: this.formatter.currency(item.price, this.currencyCode),
        disabled: !item.availableForSale
      }))
    }
  }
})
</script>
