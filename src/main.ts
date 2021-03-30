import App from '@/App.vue'
import { createApp } from 'vue'
import copy from '@/plugins/copy'
import '@/assets/styles/index.css'
import analytics from 'vue-gtag-next'
import { Integrations } from '@sentry/tracing'
import useOffers from '@/composables/useOffers'
import { intlPolyfill } from '@/polyfills/intl'
import 'focus-visible/dist/focus-visible.min.js'
import { init as sentryInit, captureException, setTag } from '@sentry/browser'

intlPolyfill()

const app = createApp(App)
  .use(copy)
  .use(analytics, { property: { id: process.env.VUE_APP_GA_MEASUREMENT_ID } })

app.config.errorHandler = (error, _, info) => {
  setTag('info', info)
  captureException(error)
}

sentryInit({
  autoSessionTracking: true,
  dsn: process.env.VUE_APP_SENTRY_DSN,
  environment: process.env.VUE_APP_ENV,
  integrations: [new Integrations.BrowserTracing()],
  logLevel: process.env.VUE_APP_ENV === 'production' ? 0 : 3,
  tracesSampleRate: process.env.VUE_APP_ENV === 'production' ? 0.25 : 1
})

app.mount('#app')

useOffers().fetchOffers()
