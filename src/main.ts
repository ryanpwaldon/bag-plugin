import App from '@/App.vue'
import { createApp } from 'vue'
import store from '@/store/store'
import copy from '@/plugins/copy'
import '@/assets/styles/index.css'
import analytics from 'vue-gtag-next'
import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'
import 'focus-visible/dist/focus-visible.min.js'
import useCrossSells from '@/composables/useCrossSells'
import pluginService, { Permission } from '@/services/api/services/pluginService'

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
  .use(store)
  .use(analytics, { property: { id: process.env.VUE_APP_GA_MEASUREMENT_ID } })
  .mount('#app')

// fetch crossSells
;(async () => {
  const permissions = await pluginService.findPermissions()
  if (!permissions.includes(Permission.CrossSell)) return
  useCrossSells().fetchCrossSells()
})()
