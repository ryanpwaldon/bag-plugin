<template>
  <form class="flex flex-col h-full" @submit="handleSubmit">
    <Header :title="mode === 'edit' ? $copy.editTitle : $copy.addToCartTitle" :close="returnToCart" />
    <Scroller>
      <Fade>
        <div class="space-y-5 xs:space-y-6" v-if="product">
          <LineItem
            :hide-options="hasOnlyDefaultVariant"
            :image="lineItemImage"
            :link-copy="$copy.viewItem"
            :options="selectedVariantOptions"
            :price="selectedVariant && formatter.currency((selectedVariant.price / 100) * fields.quantity.value.value, currencyCode)"
            :quantity="fields.quantity.value.value"
            :title="product.title"
            @click="openRelativeLink(`/products/${product.handle}?variant=${selectedVariant?.id}`)"
          />
          <div class="flex flex-col p-4 space-y-4 bg-white border rounded shadow-shadowPrimary border-colorBorderPrimary">
            <InputListbox
              :error="fields.variantId.error.value"
              :label="$copy.type"
              :options="variantIdListboxOptions"
              class="z-10"
              v-if="!hasOnlyDefaultVariant"
              v-model="fields.variantId.value.value"
            />
            <InputNumber name="quantity" :label="$copy.quantity" v-model="fields.quantity.value.value" :error="fields.quantity.error.value" />
            <div v-if="mode === 'edit'" class="flex flex-col items-start">
              <p class="block text-sm font-medium text-colorTextSecondary">{{ $copy.remove }}</p>
              <Button class="w-full mt-1" :text="$copy.removeButton" theme="white-outline" size="md" @click="removeFromCart" />
            </div>
          </div>
        </div>
        <LoaderCard class="absolute top-0 left-0" v-else />
      </Fade>
    </Scroller>
    <div class="grid flex-shrink-0 gap-4 p-5 mt-auto border-t border-dashed border-colorBorderPrimary xs:p-6">
      <Button type="submit" :text="mode === 'edit' ? $copy.saveButton : $copy.addToCartButton" />
      <Button :text="$copy.backToCartButton" theme="white" @click="$emit('route', { name: 'Home' })" />
    </div>
  </form>
</template>

<script lang="ts">
import useForm from '@/composables/useForm'
import { number, object, string } from 'yup'
import Fade from '@/components/Fade/Fade.vue'
import Header from '@/components/Header/Header.vue'
import Button from '@/components/Button/Button.vue'
import useFormatter from '@/composables/useFormatter'
import Scroller from '@/components/Scroller/Scroller.vue'
import LineItem from '@/components/LineItem/LineItem.vue'
import { getParentFrame } from '@/composables/useParentFrame'
import LoaderCard from '@/components/LoaderCard/LoaderCard.vue'
import InputNumber from '@/components/InputNumber/InputNumber.vue'
import { computed, defineComponent, onMounted, PropType, Ref, ref } from 'vue'
import { AjaxCart, AjaxLineItem, AjaxProduct, AjaxVariant } from '@/types/ajaxApi'
import InputListbox, { ListboxOption } from '@/components/InputListbox/InputListbox.vue'
export default defineComponent({
  components: {
    Fade,
    Button,
    Header,
    Scroller,
    LineItem,
    LoaderCard,
    InputNumber,
    InputListbox
  },
  props: {
    mode: {
      type: String as PropType<'add' | 'edit'>,
      required: true
    },
    lineItem: {
      type: Object as PropType<AjaxLineItem>,
      required: true
    },
    initialProduct: {
      type: Object as PropType<AjaxProduct>,
      required: true
    },
    currencyCode: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    if (props.mode === 'edit' && !props.lineItem) throw Error('Line item is required when mode is "edit".')
    if (props.mode === 'add' && !props.initialProduct) throw Error('Product is required when mode is "add".')
    const { formatter } = useFormatter()
    const product = ref() as Ref<AjaxProduct>
    const returnToCart = (cart?: AjaxCart) => emit('route', { name: 'Home', props: { initialCart: cart } })
    const removeFromCart = async () => {
      const cart = await getParentFrame().changeLineItemQuantity(props.lineItem.key, 0)
      returnToCart(cart)
    }
    const defaultQuantity = ref()
    const defaultVariantId = ref()
    const schema = computed(() =>
      object({
        quantity: number()
          .typeError('Quantity must be a number.')
          .required('Quantity is required.')
          .integer('Quantity cannot be a decimal.')
          .min(1, 'Quantity must be equal to 1 or more.')
          .default(defaultQuantity.value),
        variantId: string()
          .typeError('Type is required.')
          .required('Type is required.')
          .default(defaultVariantId.value)
      }).defined()
    )
    const { fields, handleSubmit, getValues } = useForm(schema.value)
    onMounted(async () => {
      if (props.mode === 'edit') {
        product.value = await getParentFrame().getProductByHandle(props.lineItem.handle)
        defaultQuantity.value = props.lineItem.quantity
        defaultVariantId.value = props.lineItem.variant_id
      }
      if (props.mode === 'add') {
        product.value = props.initialProduct
        defaultQuantity.value = 1
        defaultVariantId.value = product.value.variants.find(variant => variant.available)?.id.toString()
      }
    })
    const onEditSubmit = async () => {
      const { variantId, quantity } = fields
      if (variantId.modified.value) {
        console.log('variantId.modified.value')
        await getParentFrame().addToCart(variantId.value.value, quantity.value.value)
        const cart = await getParentFrame().changeLineItemQuantity(props.lineItem.key, 0)
        returnToCart(cart)
      } else if (quantity.modified.value) {
        console.log('quantity.modified.value')
        const cart = await getParentFrame().changeLineItemQuantity(props.lineItem.key, quantity.value.value)
        returnToCart(cart)
      } else {
        returnToCart()
      }
    }
    const onAddSubmit = async () => {
      const { variantId, quantity } = getValues()
      await getParentFrame().addToCart(variantId, quantity)
      returnToCart()
    }
    return {
      fields,
      product,
      formatter,
      returnToCart,
      removeFromCart,
      openRelativeLink: getParentFrame().openRelativeLink,
      handleSubmit: handleSubmit(props.mode === 'edit' ? onEditSubmit : onAddSubmit)
    }
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
