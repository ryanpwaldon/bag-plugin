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
import Home from './views/Home/Home.vue'
import Edit from './views/Edit/Edit.vue'
import Layout from './components/Layout/Layout.vue'
export default defineComponent({
  components: {
    Layout,
    Home,
    Edit
  },
  data: () => ({
    name: 'Home',
    props: {}
  }),
  methods: {
    handleRoute({ name, props }: { name: string; props: object }) {
      this.name = name
      this.props = props
    },
    enter(el: Element, done: () => void) {
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
    leave(el: Element, done: () => void) {
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
