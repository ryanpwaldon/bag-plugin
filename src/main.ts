import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import setup from '@/setup/setup'
import '@/assets/styles/index.css'

async function init() {
  await setup()
  createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
}

init()
