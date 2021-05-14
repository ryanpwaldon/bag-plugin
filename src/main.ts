import App from '@/App.vue'
import { createApp } from 'vue'
import copy from '@/plugins/copy'
import '@/assets/styles/index.css'
import analytics from 'vue-gtag-next'
import useOffers from '@/composables/useOffers'
import { intlPolyfill } from '@/polyfills/intl'
import honeybadger from '@/plugins/honeybadger'
import 'focus-visible/dist/focus-visible.min.js'

intlPolyfill()

export default createApp(App)
  .use(copy)
  .use(analytics, { property: { id: process.env.VUE_APP_GA_MEASUREMENT_ID } })
  .use(honeybadger, { apiKey: process.env.VUE_APP_HONEYBADGER_API_KEY, environment: process.env.VUE_APP_ENV })
  .mount('#app')

useOffers().fetchOffers()
