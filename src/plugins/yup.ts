import { App } from 'vue'
import { number } from 'yup'

export default {
  install: (app: App) => {
    app.config.globalProperties.$yup = { number }
  }
}
