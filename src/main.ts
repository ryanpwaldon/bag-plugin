import App from '@/App.vue'
import { createApp } from 'vue'
import copy from '@/plugins/copy'
import '@/assets/styles/index.css'
import analytics from 'vue-gtag-next'
import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'
import useOffers from '@/composables/useOffers'
import 'focus-visible/dist/focus-visible.min.js'

Sentry.init({
  tracesSampleRate: 1.0,
  autoSessionTracking: true,
  dsn: process.env.VUE_APP_SENTRY_DSN,
  environment: process.env.VUE_APP_ENV,
  integrations: [new Integrations.BrowserTracing()],
  logErrors: process.env.VUE_APP_ENV !== 'production'
})

console.log('Instantiating cart.')
createApp(App)
  .use(copy)
  .use(analytics, { property: { id: process.env.VUE_APP_GA_MEASUREMENT_ID } })
  .mount('#app')

// fetch offers
useOffers().fetchOffers()
