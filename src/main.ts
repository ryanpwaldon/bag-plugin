import App from './App.vue'
import store from './store/store'
import scroll from '@/directives/scroll'
import { createApp } from 'vue'
import '@/assets/styles/index.css'

const app = createApp(App).use(store)
app.directive('scroll', scroll)
app.mount('#app')
