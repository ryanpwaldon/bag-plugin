import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store'
import setup from '@/setup/setup'
import yup from '@/plugins/yup'
import '@/assets/styles/index.css'

setup()
createApp(App)
  .use(yup)
  .use(store)
  .mount('#app')
