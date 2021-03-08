<template>
  <div class="flex flex-col w-full h-full">
    <Header :title="$copy.title" :meta="cart && `${cart.item_count} ${cart.item_count === 1 ? $copy.itemSingular : $copy.itemPlural}`" />
    <div class="relative flex flex-col flex-1 min-h-0">
      <Fade>
        <div v-if="!cart || !offersLoaded" class="absolute top-0 left-0 w-full p-5 xs:p-6">
          <LoaderCard />
        </div>
      </Fade>
      <Fade>
        <Scroller v-if="cart && offersLoaded" class="flex-1 h-full">
          <div v-if="!lineItems.length && !progressBars.length" class="flex flex-col items-center justify-center w-full h-full space-y-2">
            <Bag class="text-gray-300 w-9" />
            <span class="text-sm text-gray-500">{{ $copy.emptyCart }}</span>
          </div>
          <div class="space-y-5 xs:space-y-6">
            <LineItem
              :key="i"
              v-for="(lineItem, i) in lineItems"
              :title="lineItem.product_title"
              :quantity="lineItem.quantity"
              :image="lineItem.featured_image.url"
              :options="lineItem.options_with_values"
              :hide-options="lineItem.product_has_only_default_variant"
              :price="cart && formatter.currency(lineItem.final_line_price / 100, cart.currency)"
              @click="$emit('route', { name: 'Edit', props: { lineItem, currencyCode: cart && cart.currency } })"
            />
            <Offers
              :line-items="lineItems"
              :cart-token="cart.token"
              :cross-sells="crossSells"
              :progress-bars="progressBars"
              :subtotal="cart.total_price / 100"
              :currency-code="cart && cart.currency"
              @route="$emit('route', $event)"
            />
          </div>
        </Scroller>
      </Fade>
      <Fade>
        <div v-if="cart && offersLoaded" class="grid flex-shrink-0 gap-4 p-5 border-t border-gray-300 border-dashed xs:p-6 bg-gray">
          <template v-if="lineItems.length">
            <Balance :subtotal="cart && formatter.currency(cart.total_price / 100, cart.currency)" />
            <Button :text="$copy.checkoutButton" :link="`${parentOrigin}/checkout`" class="w-full" />
          </template>
          <Button @click="handleClose()" class="w-full" :text="$copy.continueShoppingButton" v-else />
        </div>
      </Fade>
    </div>
  </div>
</template>

<script lang="ts">
import Bag from '@/icons/Bag.vue'
import { AjaxCart } from '@/types/ajaxApi'
import Fade from '@/components/Fade/Fade.vue'
import useOffers from '@/composables/useOffers'
import Header from '@/components/Header/Header.vue'
import Button from '@/components/Button/Button.vue'
import Offers from '@/components/Offers/Offers.vue'
import useFormatter from '@/composables/useFormatter'
import getParentOrigin from '@/utils/getParentOrigin'
import Balance from '@/components/Balance/Balance.vue'
import Scroller from '@/components/Scroller/Scroller.vue'
import LineItem from '@/components/LineItem/LineItem.vue'
import useParentFrame from '@/composables/useParentFrame'
import { computed, defineComponent, PropType, ref } from 'vue'
import LoaderCard from '@/components/LoaderCard/LoaderCard.vue'
export default defineComponent({
  components: {
    Bag,
    Fade,
    Header,
    Button,
    Balance,
    Offers,
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
    const { formatter } = useFormatter()
    const parentOrigin = getParentOrigin()
    const { parentFrame } = useParentFrame()
    const { crossSells, progressBars, loaded: offersLoaded } = useOffers()
    const cart = ref((props.initialCart || null) as null | AjaxCart)
    const lineItems = computed(() => cart.value?.items || [])
    const fetchCart = async () => (cart.value = await parentFrame.value.getCart())
    if (!cart.value) fetchCart()
    return { cart, lineItems, crossSells, progressBars, formatter, parentOrigin, offersLoaded, handleClose: parentFrame.value.close }
  }
})
</script>
