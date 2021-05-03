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
              v-for="(lineItem, i) in lineItems"
              :title="lineItem.product_title"
              :quantity="lineItem.quantity"
              :image="lineItem.featured_image.url"
              :options="lineItem.options_with_values"
              :hide-options="lineItem.product_has_only_default_variant"
              :price="cart && formatter.currency(lineItem.final_line_price / 100, cart.currency)"
              @click="$emit('route', { name: 'Edit', props: { lineItem, currencyCode: cart && cart.currency } })"
              :link-copy="$copy.edit"
            />
            <Offers :cart="cart" @route="$emit('route', $event)" />
          </div>
        </Scroller>
        <div v-else class="absolute top-0 left-0 w-full p-5 xs:p-6">
          <LoaderCard />
        </div>
      </Fade>
      <Fade>
        <div v-if="cart" class="grid flex-shrink-0 gap-4 p-5 border-t border-gray-300 border-dashed xs:p-6 bg-gray">
          <template v-if="lineItems.length">
            <Balance :subtotal="cart && formatter.currency(cart.total_price / 100, cart.currency)" />
            <Button :text="$copy.checkoutButton" @click="openRelativeLink('/checkout')" class="w-full" />
          </template>
          <Button @click="handleClose" class="w-full" :text="$copy.continueShoppingButton" v-else />
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
import Balance from '@/components/Balance/Balance.vue'
import Scroller from '@/components/Scroller/Scroller.vue'
import LineItem from '@/components/LineItem/LineItem.vue'
import { getParentFrame } from '@/composables/useParentFrame'
import { computed, defineComponent, PropType, ref } from 'vue'
import LoaderCard from '@/components/LoaderCard/LoaderCard.vue'
import EmptyBag from '@/components/EmptyBag/EmptyBag.vue'
export default defineComponent({
  components: {
    Fade,
    Header,
    Button,
    Balance,
    Offers,
    Scroller,
    LineItem,
    LoaderCard,
    EmptyBag
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
    const fetchCart = async () => (cart.value = await getParentFrame().getCart())
    if (!cart.value) fetchCart()
    return { cart, lineItems, formatter, openRelativeLink: getParentFrame().openRelativeLink }
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
