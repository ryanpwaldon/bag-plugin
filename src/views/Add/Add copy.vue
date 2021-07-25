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
            @click="openRelativeLink(`/products/${product.handle}?variant=${selectedVariant?.id}`)"
            :link-copy="$copy.viewItem"
          />
          <div class="flex flex-col p-4 space-y-4 bg-white border rounded shadow-shadowPrimary border-colorBorderPrimary">
            <InputListbox
              class="z-10"
              :label="$copy.type"
              :options="variantIdListboxOptions"
              :error="fields.variantId.error.value"
              v-if="!hasOnlyDefaultVariant"
              v-model="fields.variantId.value.value"
            />
            <InputNumber name="quantity" :label="$copy.quantity" v-model="fields.quantity.value.value" :error="fields.quantity.error.value" />
          </div>
        </div>
        <LoaderCard class="absolute top-0 left-0" v-else />
      </transition>
    </Scroller>
    <div class="grid flex-shrink-0 gap-4 p-5 mt-auto border-t border-dashed border-colorBorderPrimary xs:p-6">
      <Button type="submit" :text="$copy.addToCartButton" />
      <Button :text="$copy.cancelButton" theme="white" @click="$emit('route', { name: 'Home' })" />
    </div>
  </form>
</template>

<script lang="ts">
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
import { getParentFrame } from '@/composables/useParentFrame'
export default defineComponent({
  components: {
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
    const onSubmit = async () => {
      const { variantId, quantity } = getValues()
      await getParentFrame().addToCart(variantId, quantity)
      returnToCart()
    }
    return {
      fields,
      modified,
      formatter,
      getValues,
      returnToCart,
      handleSubmit: handleSubmit(onSubmit),
      openRelativeLink: getParentFrame().openRelativeLink
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
