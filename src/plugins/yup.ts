import { App } from 'vue'
import { string, number } from 'yup'

export default {
  install: (app: App) => {
    app.config.globalProperties.$yup = {
      string,
      number
    }
  }
}
