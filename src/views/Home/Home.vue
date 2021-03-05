<template>
  <div class="flex flex-col w-full h-full">
    <Header :title="$copy.title" :meta="cart && `${cart.item_count} ${cart.item_count === 1 ? $copy.itemSingular : $copy.itemPlural}`" />
    <Divider />
    <div class="relative flex flex-col flex-1 min-h-0">
      <Fade>
        <div v-if="!cart" class="absolute top-0 left-0 w-full p-6">
          <LoaderCard />
        </div>
      </Fade>
      <Fade>
        <Scroller v-if="cart" class="flex-1 h-full">
          <div class="space-y-6">
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
          </div>
          <Offers
            class="mt-5"
            :cart-token="cart.token"
            :currency-code="cart && cart.currency"
            :line-items-as-product-ids="lineItems.map(item => formatter.toGid('Product', item.product_id))"
            :subtotal="cart.total_price / 100"
            @route="$emit('route', $event)"
          />
        </Scroller>
      </Fade>
      <Fade>
        <div v-if="cart" class="grid flex-shrink-0 gap-5 p-6 border-t border-gray-300 border-dashed bg-gray">
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
import { AjaxCart } from '@/types/ajaxApi'
import Fade from '@/components/Fade/Fade.vue'
import Header from '@/components/Header/Header.vue'
import Button from '@/components/Button/Button.vue'
import Offers from '@/components/Offers/Offers.vue'
import useFormatter from '@/composables/useFormatter'
import getParentOrigin from '@/utils/getParentOrigin'
import Balance from '@/components/Balance/Balance.vue'
import Divider from '@/components/Divider/Divider.vue'
import Scroller from '@/components/Scroller/Scroller.vue'
import LineItem from '@/components/LineItem/LineItem.vue'
import useParentFrame from '@/composables/useParentFrame'
import { computed, defineComponent, PropType, ref } from 'vue'
import LoaderCard from '@/components/LoaderCard/LoaderCard.vue'
export default defineComponent({
  components: {
    Header,
    Button,
    Balance,
    Offers,
    Scroller,
    LineItem,
    LoaderCard,
    Divider,
    Fade
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
    const cart = ref((props.initialCart || null) as null | AjaxCart)
    const lineItems = computed(() => cart.value?.items || [])
    const fetchCart = async () => (cart.value = await parentFrame.value.getCart())
    if (!cart.value) fetchCart()
    return { cart, lineItems, formatter, parentOrigin, handleClose: parentFrame.value.close }
  }
})
</script>
