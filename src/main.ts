import App from '@/App.vue'
import { createApp } from 'vue'
import store from '@/store/store'
import setup from '@/setup/setup'
import '@/assets/styles/index.css'
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
    .directive('scroll', scroll)
    .mount('#app')
}

start()
