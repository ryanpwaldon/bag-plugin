<template>
  <Layout>
    <component :is="name" v-bind="props" @route="handleRoute" />
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Layout from './components/Layout/Layout.vue'
import Home from './views/Home/Home.vue'
import Edit from './views/Edit/Edit.vue'
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
    }
  }
})
</script>
