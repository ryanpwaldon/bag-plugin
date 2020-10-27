import App from './App.vue'
import store from './store/store'
import { createApp } from 'vue'
import '@/assets/styles/index.css'

createApp(App)
  .use(store)
  .mount('#app')
