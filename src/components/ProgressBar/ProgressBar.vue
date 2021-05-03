<template>
  <div
    class="flex flex-shrink-0 w-full overflow-hidden bg-white rounded shadow pointer-events-none focus-visible:outline-none whitespace-nowrap focus-visible:ring-2 focus-visible:ring-blue-500 group focus:outline-none xs:min-h-24 min-h-22"
  >
    <div class="self-stretch flex-shrink-0 bg-center bg-cover rounded-l w-22 xs:w-24" :style="{ backgroundImage: `url(${image})` }" />
    <div class="flex flex-col items-start justify-center w-full p-3 overflow-hidden">
      <p class="w-full text-sm font-medium text-gray-900 truncate">{{ title }}</p>
      <p class="flex w-full mt-1 text-xs">
        <span v-if="cartEmpty || (goalReached && !completionMessage)" class="text-gray-500 truncate">{{ $copy.spendMoreThan(goalFormatted) }}</span>
        <span v-if="goalReached && completionMessage" class="text-gray-500 truncate">{{ completionMessage }}</span>
        <span v-if="!cartEmpty && !goalReached" class="text-gray-500 truncate">{{ $copy.amountRemaining(remainingSpendFormatted) }}</span>
      </p>
      <div class="flex items-center w-full mt-2 space-x-2">
        <div class="relative flex-1 h-4 rounded-sm bg-gradient-to-r from-gray-100 to-gray-200">
          <div
            class="h-full rounded-sm from-gray-500 to-gray-800 bg-gradient-to-r"
            :class="!goalReached && 'animate-pulse'"
            :style="{ width: progressFormatted }"
          />
        </div>
        <Check v-if="goalReached" class="flex-shrink-0 w-4" />
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
