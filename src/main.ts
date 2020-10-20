import App from './App.vue'
import yup from '@/plugins/yup'
import store from './store/store'
import setup from '@/setup/setup'
import formatter from '@/plugins/formatter'
import { createApp } from 'vue'
import '@/assets/styles/index.css'

setup()
createApp(App)
  .use(yup)
  .use(store)
  .use(formatter)
  .mount('#app')
