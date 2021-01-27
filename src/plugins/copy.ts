import { App } from 'vue'
import getLocale from '@/utils/getLocale'
import translations from '@/translations'

export type Copy = Record<keyof typeof translations, string>

const createCopyObject = () => {
  const locale = getLocale()
  const entries = Object.entries(translations) as [keyof typeof translations, Record<string, string>][]
  return entries.reduce((copy, [key, value]) => {
    copy[key] = value[locale]
    return copy
  }, {} as Copy)
}

export default {
  install: (app: App) => (app.config.globalProperties.$copy = createCopyObject())
}
