import App from '@/App.vue'
import { createApp } from 'vue'
import store from '@/store/store'
import setup from '@/setup/setup'
import '@/assets/styles/index.css'
import analytics from 'vue-gtag-next'
import * as Sentry from '@sentry/vue'
import scroll from '@/directives/scroll'
import { Integrations } from '@sentry/tracing'

Sentry.init({
  tracesSampleRate: 1.0,
  autoSessionTracking: true,
  dsn: process.env.VUE_APP_SENTRY_DSN,
  environment: process.env.VUE_APP_ENV,
  integrations: [new Integrations.BrowserTracing()],
  logErrors: process.env.VUE_APP_ENV !== 'production'
})

const start = async () => {
  const ready = await setup()
  if (!ready) return console.log('Cart not active.')
  else console.log('Cart started.')
  createApp(App)
    .use(store)
    .use(analytics, { property: { id: process.env.VUE_APP_GA_MEASUREMENT_ID } })
    .directive('scroll', scroll)
    .mount('#app')
}

start()
