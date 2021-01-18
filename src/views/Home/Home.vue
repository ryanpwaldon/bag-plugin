<template>
  <div class="flex flex-col h-full">
    <Header title="Your cart" :meta="cart && `${cart.item_count} ${cart.item_count === 1 ? 'item' : 'items'}`" />
    <Scroller>
      <transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="cart">
          <CardLayout>
            <EmptyCart v-if="!lineItems.length" />
            <LineItem
              v-else
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
          </CardLayout>
          <Offers
            class="mt-5"
            :cart-token="cart.token"
            :currency-code="cart && cart.currency"
            :line-items-as-product-ids="lineItems.map(item => formatter.toGid('Product', item.product_id))"
            @route="$emit('route', $event)"
          />
        </div>
        <CardLayout v-else class="absolute top-0 left-0 w-full h-full">
          <LoaderCard />
        </CardLayout>
      </transition>
    </Scroller>
    <div class="grid flex-shrink-0 gap-5 p-6 bg-white border-t border-gray-200">
      <Balance :subtotal="cart && formatter.currency(cart.total_price / 100, cart.currency)" />
      <a :href="`${parentOrigin}/checkout`" target="_parent" v-if="lineItems.length || !cart">
        <Button text="Checkout" theme="black" class="w-full" />
      </a>
      <Button @click="handleClose()" class="w-full" text="Continue shopping" theme="black" v-else />
    </div>
  </div>
</template>

<script lang="ts">
import Header from '@/components/Header/Header.vue'
import Button from '@/components/Button/Button.vue'
import Offers from '@/components/Offers/Offers.vue'
import Scroller from '@/components/Scroller/Scroller.vue'
import LineItem from '@/components/LineItem/LineItem.vue'
import CardLayout from '@/components/CardLayout/CardLayout.vue'
import Balance from '@/components/Balance/Balance.vue'
import LoaderCard from '@/components/LoaderCard/LoaderCard.vue'
import EmptyCart from '@/components/EmptyCart/EmptyCart.vue'
import useFormatter from '@/composables/useFormatter'
import { AjaxCart } from '@/types/ajaxApi'
import { computed, defineComponent, PropType, ref } from 'vue'
import useParentOrigin from '@/composables/useParentOrigin'
import useParentFrame from '@/composables/useParentFrame'
export default defineComponent({
  components: {
    Header,
    Button,
    Balance,
    Offers,
    Scroller,
    LineItem,
    CardLayout,
    LoaderCard,
    EmptyCart
  },
  props: {
    initialCart: {
      type: Object as PropType<AjaxCart>,
      required: false
    }
  },
  setup(props) {
    const { formatter } = useFormatter()
    const parentOrigin = useParentOrigin()
    const { parentFrame } = useParentFrame()
    const cart = ref((props.initialCart || null) as null | AjaxCart)
    const lineItems = computed(() => cart.value?.items || [])
    const fetchCart = async () => (cart.value = await parentFrame.value.getCart())
    if (!cart.value) fetchCart()
    return { cart, lineItems, formatter, parentOrigin, handleClose: parentFrame.value.close }
  }
})
</script>
