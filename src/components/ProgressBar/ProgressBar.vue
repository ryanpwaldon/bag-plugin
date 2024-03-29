<template>
  <Card :image="image">
    <div class="flex flex-col items-start justify-center w-full p-3 overflow-hidden">
      <p class="w-full text-sm font-medium truncate">{{ title }}</p>
      <p class="flex w-full mt-1 text-xs">
        <span v-if="cartEmpty || (goalReached && !completionMessage)" class="truncate text-textColor2">{{ $copy.spendMoreThan(goalFormatted) }}</span>
        <span v-if="goalReached && completionMessage" class="truncate text-textColor2">{{ completionMessage }}</span>
        <span v-if="!cartEmpty && !goalReached" class="truncate text-textColor2">{{ $copy.amountRemaining(remainingSpendFormatted) }}</span>
      </p>
      <div class="flex items-center w-full mt-2 space-x-2">
        <div class="relative flex-1 h-4 overflow-hidden rounded-roundness2">
          <div class="absolute top-0 left-0 w-full h-full bg-themeColor2 filter brightness-brightness2" />
          <div
            :style="{ width: progressFormatted }"
            :class="!goalReached && 'animate-pulse'"
            class="absolute top-0 left-0 z-10 h-full rounded-roundness2 bg-progressBarColor"
          />
        </div>
        <Check v-if="goalReached" class="flex-shrink-0 w-4 text-progressBarColor" />
      </div>
    </div>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Check from '@/icons/Check.vue'
import Card from '@/components/Card/Card.vue'
import useFormatter from '@/composables/useFormatter'
export default defineComponent({
  components: { Check, Card },
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
