import App from './App.vue'
import store from './store/store'
import setup from '@/setup/setup'
import { createApp } from 'vue'
import '@/assets/styles/index.css'

setup()
createApp(App)
  .use(store)
  .mount('#app')
