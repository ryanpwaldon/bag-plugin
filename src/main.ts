import App from './App.vue'
import store from './store/store'
import setup from '@/functions/setup'
import scroll from '@/directives/scroll'
import { createApp } from 'vue'
import '@/assets/styles/index.css'

const start = async () => {
  await setup()
  createApp(App)
    .use(store)
    .directive('scroll', scroll)
    .mount('#app')
}

start()
