<template>
  <Layout @route="handleRoute">
    <transition mode="out-in" @enter="enter" @leave="leave">
      <component :is="name" v-bind="props" @route="handleRoute" />
    </transition>
  </Layout>
</template>

<script lang="ts">
import anime from 'animejs'
import { defineComponent } from 'vue'
import Add from './views/Add/Add.vue'
import Home from './views/Home/Home.vue'
import Edit from './views/Edit/Edit.vue'
import Layout from './components/Layout/Layout.vue'
import useCrossSells from '@/composables/useCrossSells'
import { hasCrossSellPermission } from '@/utils/checkPermissions'
export default defineComponent({
  components: {
    Layout,
    Home,
    Edit,
    Add
  },
  data: () => ({
    name: 'Home',
    props: {}
  }),
  mounted() {
    if (hasCrossSellPermission()) useCrossSells().fetchCrossSells()
  },
  methods: {
    handleRoute({ name, props }: { name: string; props: object }) {
      this.name = name
      this.props = props
    },
    enter(el: HTMLElement, done: undefined) {
      const translateX = this.name === 'Home' ? [-4, 0] : [4, 0]
      anime({
        targets: el,
        translateX,
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 150,
        complete: done
      })
    },
    leave(el: HTMLElement, done: undefined) {
      const translateX = this.name === 'Home' ? [0, 4] : [0, -4]
      anime({
        targets: el,
        translateX,
        opacity: [1, 0],
        easing: 'easeInOutQuad',
        duration: 150,
        complete: done
      })
    }
  }
})
</script>
