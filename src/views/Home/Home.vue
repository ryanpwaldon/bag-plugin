<template>
  <div class="flex flex-col w-full h-full">
    <Header :title="$copy.title" :meta="itemsCopy" />
    <div class="relative flex flex-col flex-1 min-h-0">
      <Fade>
        <Scroller v-if="cart" class="flex-1 h-full">
          <div class="space-y-5 xs:space-y-6">
            <EmptyBag v-if="!lineItems.length" />
            <LineItem
              :key="i"
              :link-copy="$copy.edit"
              :quantity="lineItem.quantity"
              :title="lineItem.product_title"
              v-for="(lineItem, i) in lineItems"
              :image="lineItem.featured_image.url"
              :options="lineItem.options_with_values"
              :hide-options="lineItem.product_has_only_default_variant"
              :display-original-price="lineItem.original_line_price > lineItem.final_line_price"
              :price="cart && formatter.currency(lineItem.final_line_price / 100, cart.currency)"
              :original-price="cart && formatter.currency(lineItem.original_line_price / 100, cart.currency)"
              @click="$emit('route', { name: 'Edit', props: { lineItem, currencyCode: cart?.currency, mode: 'edit' } })"
            />
            <Offers :cart="cart" @route="$emit('route', $event)" />
          </div>
        </Scroller>
        <div v-else class="absolute top-0 left-0 w-full p-5 xs:p-6">
          <LoaderCard />
        </div>
      </Fade>
      <Fade>
        <form @submit.prevent="handleCheckout" v-if="cart" class="grid flex-shrink-0 gap-4 p-5 border-t border-borderColor1 xs:p-6 bg-gray">
          <template v-if="lineItems.length">
            <Balance
              :subtotal="formatter.currency(cart.total_price / 100, cart.currency)"
              :display-original-subtotal="cart.original_total_price > cart.total_price"
              :original-subtotal="formatter.currency(cart.original_total_price / 100, cart.currency)"
            />
            <Terms v-if="cartSettings.termsEnabled" v-model:checked="termsChecked" v-model:display-error="displayTermsError" />
            <Button type="submit" :text="$copy.checkoutButton" class="w-full" />
          </template>
          <Button @click="handleClose" class="w-full" :text="$copy.continueShoppingButton" :theme="lineItems.length ? 'white' : 'primary'" />
        </form>
      </Fade>
    </div>
  </div>
</template>

<script lang="ts">
import { AjaxCart } from '@/types/ajaxApi'
import Fade from '@/components/Fade/Fade.vue'
import Terms from '@/components/Terms/Terms.vue'
import Header from '@/components/Header/Header.vue'
import Button from '@/components/Button/Button.vue'
import Offers from '@/components/Offers/Offers.vue'
import useFormatter from '@/composables/useFormatter'
import Balance from '@/components/Balance/Balance.vue'
import Scroller from '@/components/Scroller/Scroller.vue'
import LineItem from '@/components/LineItem/LineItem.vue'
import EmptyBag from '@/components/EmptyBag/EmptyBag.vue'
import useCartSettings from '@/composables/useCartSettings'
import { getParentFrame } from '@/composables/useParentFrame'
import { computed, defineComponent, PropType, ref } from 'vue'
import LoaderCard from '@/components/LoaderCard/LoaderCard.vue'
export default defineComponent({
  components: {
    Fade,
    Terms,
    Header,
    Button,
    Offers,
    Balance,
    EmptyBag,
    Scroller,
    LineItem,
    LoaderCard
  },
  props: {
    initialCart: {
      type: Object as PropType<AjaxCart>,
      required: false
    }
  },
  setup(props) {
    const termsChecked = ref(false)
    const displayTermsError = ref(false)
    const { formatter } = useFormatter()
    const { cartSettings } = useCartSettings()
    const cart = ref((props.initialCart || null) as null | AjaxCart)
    const lineItems = computed(() => cart.value?.items || [])
    const fetchCart = async () => (cart.value = await getParentFrame().getCart())
    const handleCheckout = () => {
      if (cartSettings.value.termsEnabled && !termsChecked.value) return (displayTermsError.value = true)
      getParentFrame().openRelativeLink('/checkout')
    }
    if (!cart.value) fetchCart()
    return { cart, lineItems, formatter, cartSettings, handleCheckout, termsChecked, displayTermsError }
  },
  computed: {
    itemsCopy(): string {
      if (!this.cart) return ''
      if (this.cart.item_count === 1) return this.$copy.itemSingular
      return this.$copy.itemPlural(this.cart.item_count)
    }
  },
  methods: {
    handleClose() {
      getParentFrame().close()
    }
  }
})
</script>
