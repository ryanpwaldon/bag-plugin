<template>
  <div class="flex flex-col w-full h-full">
    <Header :title="$copy.title" :meta="cart && `${cart.item_count} ${cart.item_count === 1 ? $copy.itemSingular : $copy.itemPlural}`" />
    <Divider />
    <div class="relative flex-1">
      <transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="cart" class="flex flex-col w-full">
          <Scroller>
            <Reward :subtotal="cart.total_price / 100" :currencyCode="cart.currency" />
            <Divider v-if="lineItems.length" class="my-6" />
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
              @route="$emit('route', $event)"
            />
          </Scroller>
          <Divider />
          <div class="grid flex-shrink-0 gap-5 p-6 bg-gray">
            <template v-if="lineItems.length">
              <Balance :subtotal="cart && formatter.currency(cart.total_price / 100, cart.currency)" />
              <Button :text="$copy.checkoutButton" :link="`${parentOrigin}/checkout`" class="w-full" />
            </template>
            <Button @click="handleClose()" class="w-full" :text="$copy.continueShoppingButton" v-else />
          </div>
        </div>
        <div class="absolute w-full h-full p-6 t-0 l-0" v-else>
          <LoaderCard />
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { AjaxCart } from '@/types/ajaxApi'
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
import Reward from '@/components/Reward/Reward.vue'
import Divider from '@/components/Divider/Divider.vue'
export default defineComponent({
  components: {
    Header,
    Button,
    Balance,
    Offers,
    Scroller,
    LineItem,
    LoaderCard,
    Reward,
    Divider
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
