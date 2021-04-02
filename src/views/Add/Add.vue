<template>
  <form class="flex flex-col h-full" @submit="handleSubmit">
    <Header :title="$copy.addToCartTitle" :close="returnToCart" />
    <Scroller>
      <transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div class="space-y-5 xs:space-y-6" v-if="product">
          <LineItem
            :title="product.title"
            :image="lineItemImage"
            :quantity="fields.quantity.value.value"
            :options="selectedVariantOptions"
            :hide-options="hasOnlyDefaultVariant"
            :price="selectedVariant && formatter.currency((selectedVariant.price / 100) * fields.quantity.value.value, currencyCode)"
            :relative-link="`/products/${product.handle}?variant=${selectedVariant?.id}`"
            edit-mode
          />
          <Card>
            <InputListbox
              class="z-10"
              :label="$copy.type"
              :options="variantIdListboxOptions"
              :error="fields.variantId.error.value"
              v-if="!hasOnlyDefaultVariant"
              v-model="fields.variantId.value.value"
            />
            <InputNumber name="quantity" :label="$copy.quantity" v-model="fields.quantity.value.value" :error="fields.quantity.error.value" />
          </Card>
        </div>
        <LoaderCard class="absolute top-0 left-0" v-else />
      </transition>
    </Scroller>
    <div class="grid flex-shrink-0 gap-4 p-5 mt-auto bg-gray-100 border-t border-gray-300 border-dashed xs:p-6">
      <Button type="submit" :text="$copy.addToCartButton" />
      <Button :text="$copy.cancelButton" theme="white" @click="$emit('route', { name: 'Home' })" />
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
import InputNumber from '@/components/InputNumber/InputNumber.vue'
import InputListbox, { ListboxOption } from '@/components/InputListbox/InputListbox.vue'
import useFormatter from '@/composables/useFormatter'
import useForm from '@/composables/useForm'
import { number, object, string } from 'yup'
import { defineComponent, PropType } from 'vue'
import { AjaxCart, AjaxProduct, AjaxVariant } from '@/types/ajaxApi'
import useParentFrame from '@/composables/useParentFrame'
export default defineComponent({
  components: {
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
    product: {
      type: Object as PropType<AjaxProduct>,
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
    const { parentFrame } = useParentFrame()
    const onSubmit = async () => {
      const { parentFrame } = useParentFrame()
      const { variantId, quantity } = getValues()
      await parentFrame.value.addToCart(variantId, quantity)
      returnToCart()
    }
    return {
      fields,
      modified,
      formatter,
      getValues,
      parentFrame,
      returnToCart,
      handleSubmit: handleSubmit(onSubmit)
    }
  },
  async created() {
    this.fields.variantId.value.value = this.product.variants.find(variant => variant.available)?.id.toString()
  },
  computed: {
    lineItemImage(): string | null {
      return this.selectedVariant?.featured_image?.src || this.product?.featured_image || null
    },
    hasOnlyDefaultVariant(): boolean {
      return this.product?.options.length === 1 && this.product?.options[0].values[0] === 'Default Title'
    },
    selectedVariant(): AjaxVariant | undefined {
      return this.hasOnlyDefaultVariant
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
        meta: item.available ? this.formatter.currency(item.price / 100, this.currencyCode) : this.$copy.soldOut,
        disabled: !item.available
      }))
    }
  }
})
</script>
