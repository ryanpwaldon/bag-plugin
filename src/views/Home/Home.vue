<template>
  <div class="flex flex-col h-full">
    <Header title="Your cart" :meta="cart && `${cart.item_count} items`" />
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
    <div class="grid flex-shrink-0 gap-4 p-5 border-t border-true-gray-200">
      <Balance :subtotal="cart && formatter.currency(cart.total_price / 100, cart.currency)" />
      <a :href="`${parentOrigin}/checkout`" target="_parent"><Button text="Checkout" theme="black" class="w-full"/></a>
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
import { comms } from '@/services/comms/comms'
import { AjaxCart } from '@/types/ajaxApi'
import { ServerOffer } from '@/types/serverApi'
import { computed, defineComponent, PropType, Ref, ref } from 'vue'
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
    const cart = ref((props.initialCart || null) as null | AjaxCart)
    const lineItems = computed(() => cart.value?.items || [])
    const offers: Ref<ServerOffer[]> = ref([])
    const fetchCart = async () => (cart.value = await (await comms).getCart())
    if (!cart.value) fetchCart()
    const parentOrigin = ref(null as null | string)
    const getParentOrigin = async () => (parentOrigin.value = await (await comms).getParentOrigin())
    getParentOrigin()
    return { cart, lineItems, offers, formatter, parentOrigin }
  }
})
</script>
