import App from '@/App.vue'
import store from '@/store/store'
import setup from '@/setup/setup'
import scroll from '@/directives/scroll'
import { createApp } from 'vue'
import '@/assets/styles/index.css'

const start = async () => {
  const ready = await setup()
  if (!ready) return console.log('Cart not active.')
  else console.log('Cart started.')
  createApp(App)
    .use(store)
    .directive('scroll', scroll)
    .mount('#app')
}

start()
