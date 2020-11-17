<template>
  <form class="flex flex-col h-full" @submit.prevent="handleSubmit(submit)">
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
            :quantity="values.quantity"
            :options="selectedVariantOptions"
            :hide-options="product.hasOnlyDefaultVariant"
            :price="selectedVariant && formatter.currency(selectedVariant.price * values.quantity, currencyCode)"
            edit-mode
          />
          <Card class="grid gap-4">
            <InputListbox
              label="Type"
              :value="values.variantId"
              :options="variantIdListboxOptions"
              :error="errors.variantId"
              @update="updateValue('variantId', $event)"
              v-if="!product.hasOnlyDefaultVariant"
              class="z-10"
            />
            <InputNumber
              name="quantity"
              label="Quantity"
              :value="values.quantity"
              @update="updateValue('quantity', $event)"
              :error="errors.quantity"
            />
          </Card>
        </CardLayout>
        <CardLayout v-else class="absolute top-0 left-0 w-full h-full">
          <LoaderCard />
        </CardLayout>
      </transition>
    </Scroller>
    <div class="grid flex-shrink-0 gap-4 p-5 mt-auto border-t border-true-gray-200">
      <Button type="submit" text="Add to cart" theme="black" />
      <Button text="Cancel" theme="white-outline" @click="$emit('route', { name: 'Home' })" />
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
import { comms } from '@/services/comms/comms'
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
  setup() {
    const { formatter } = useFormatter()
    const { values, defaults, updateValue, errors, handleSubmit } = useForm(
      object({
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
    )
    return {
      values,
      defaults,
      errors,
      formatter,
      updateValue,
      handleSubmit
    }
  },
  async created() {
    this.product = await productService.findOne(this.productId)
    if (this.product.hasOnlyDefaultVariant) this.values.variantId = this.variants[0].legacyResourceId
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
      return this.product?.hasOnlyDefaultVariant
        ? this.variants[0]
        : this.variants.find(item => item.legacyResourceId === this.values.variantId) || null
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
  },
  methods: {
    async submit() {
      const { addToCart } = await comms
      const { variantId, quantity } = this.values
      await addToCart(variantId, quantity)
      this.returnToCart()
    },
    returnToCart(cart?: AjaxCart) {
      this.$emit('route', { name: 'Home', props: { initialCart: cart } })
    }
  }
})
</script>
