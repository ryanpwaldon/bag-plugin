import App from './App.vue'
import store from './store/store'
import scroll from '@/directives/scroll'
import useCrossSells from '@/composables/useCrossSells'
import '@/assets/styles/index.css'
import { createApp } from 'vue'

const app = createApp(App).use(store)
app.directive('scroll', scroll)
app.mount('#app')
const { fetchCrossSells } = useCrossSells()
fetchCrossSells()
