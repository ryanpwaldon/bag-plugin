<template>
  <div
    class="flex flex-shrink-0 w-full overflow-hidden bg-white rounded shadow pointer-events-none focus-visible:outline-none whitespace-nowrap focus-visible:ring-2 focus-visible:ring-blue-500 group focus:outline-none"
  >
    <div class="flex-shrink-0 w-24 h-24 bg-center bg-cover" :style="{ backgroundImage: `url(${image})` }" />
    <div class="flex flex-col items-start justify-center w-full p-4 overflow-hidden">
      <div class="flex justify-between w-full text-sm font-medium text-gray-900">
        <p>{{ title }}</p>
        <div v-if="goalReached" class="flex items-center space-x-1">
          <p>{{ $copy.complete }}</p>
          <Check />
        </div>
      </div>
      <p class="flex mt-1 text-xs">
        <span v-if="cartEmpty || (goalReached && !completionMessage)" class="text-gray-500">{{ $copy.spendMoreThan }} {{ goalFormatted }}</span>
        <span v-if="goalReached && completionMessage" class="text-gray-500">{{ completionMessage }}</span>
        <span v-if="!cartEmpty && !goalReached" class="text-gray-500">{{ $copy.amountRemaining(remainingSpendFormatted) }}</span>
      </p>
      <div v-if="!goalReached" class="w-full h-4 mt-2 rounded-sm bg-gradient-to-r from-gray-100 to-gray-200">
        <div class="relative h-full rounded-sm from-gray-500 to-gray-800 bg-gradient-to-r animate-pulse" :style="{ width: progressFormatted }" />
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
    goal: {
      type: Number,
      required: true
    },
    completionMessage: {
      type: String,
      required: false
    }
  },
  setup() {
    const { formatter } = useFormatter()
    return { formatter }
  },
  computed: {
    cartEmpty(): boolean {
      return this.subtotal === 0
    },
    goalFormatted(): string {
      return this.formatter.currency(this.goal, this.currencyCode)
    },
    remainingSpend(): number {
      return this.goal - this.subtotal
    },
    remainingSpendFormatted(): string {
      return this.formatter.currency(this.remainingSpend, this.currencyCode)
    },
    goalReached(): boolean {
      return this.remainingSpend <= 0
    },
    progress(): number {
      return this.goalReached ? 1 : this.subtotal / this.goal
    },
    progressFormatted(): string {
      return this.progress * 100 + '%'
    }
  }
})
</script>
