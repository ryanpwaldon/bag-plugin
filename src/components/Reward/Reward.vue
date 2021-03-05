<template>
  <div
    class="flex flex-shrink-0 w-full overflow-hidden bg-white shadow pointer-events-none focus-visible:outline-none whitespace-nowrap focus-visible:ring-2 focus-visible:ring-blue-500 group focus:outline-none"
  >
    <div class="flex-shrink-0 w-24 h-24 bg-center bg-cover" :style="{ backgroundImage: `url(${image})` }" />
    <div class="flex flex-col items-start justify-center w-full p-4 overflow-hidden">
      <div class="flex justify-between w-full text-sm font-medium text-gray-900">
        <p>{{ title }}</p>
        <div v-if="minSpendReached" class="flex items-center space-x-1">
          <p>Complete</p>
          <Check />
        </div>
      </div>
      <p class="flex mt-1 text-xs">
        <span v-if="!subtotal || this.minSpendReached" class="text-gray-500">Spend more than {{ minSpendFormatted }}</span>
        <span v-else class="text-gray-500">You're only {{ remainingSpendFormatted }} away</span>
      </p>
      <div v-if="!minSpendReached" class="w-full h-4 mt-2 bg-gray-100">
        <div class="relative h-full from-gray-500 to-gray-800 bg-gradient-to-r" :style="{ width: progressFormatted }" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Check from '@/icons/Check.vue'
import useFormatter from '@/composables/useFormatter'
export default defineComponent({
  components: { Check },
  props: {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    currencyCode: {
      type: String,
      required: true
    },
    subtotal: {
      type: Number,
      default: 0
    },
    minSpend: {
      type: Number,
      required: true
    }
  },
  setup() {
    const { formatter } = useFormatter()
    return { formatter }
  },
  computed: {
    minSpendFormatted(): string {
      return this.formatter.currency(this.minSpend, this.currencyCode)
    },
    remainingSpend(): number {
      return this.minSpend - this.subtotal
    },
    remainingSpendFormatted(): string {
      return this.formatter.currency(this.remainingSpend, this.currencyCode)
    },
    minSpendReached(): boolean {
      return this.remainingSpend <= 0
    },
    progress(): number {
      return this.minSpendReached ? 1 : this.subtotal / this.minSpend
    },
    progressFormatted(): string {
      return this.progress * 100 + '%'
    }
  }
})
</script>
