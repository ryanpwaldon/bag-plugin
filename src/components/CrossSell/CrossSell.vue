<template>
  <Card :image="resizeImage(image, 400)" type="button">
    <div class="flex items-center justify-between w-full p-3 overflow-hidden">
      <div class="relative flex flex-col w-full space-y-1 overflow-hidden text-left">
        <p
          class="text-sm font-medium leading-5 transition duration-150 ease-in-out"
          style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;"
        >
          {{ title }}
        </p>
        <p
          class="text-xs leading-4 text-colorTextSecondary"
          style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;"
        >
          {{ subtitle }}
        </p>
      </div>
      <div class="relative flex items-center pl-4 transition duration-150 ease-in-out">
        <ChevronRight />
      </div>
    </div>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from '@/components/Card/Card.vue'
import ChevronRight from '@/icons/ChevronRight.vue'
import useResizeImage from '@/composables/useResizeImage'
export default defineComponent({
  components: { Card, ChevronRight },
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    cartToken: {
      type: String,
      required: true
    },
    productId: {
      type: String,
      required: true
    }
  },
  setup() {
    const resizeImage = useResizeImage()
    return { resizeImage }
  }
})
</script>
