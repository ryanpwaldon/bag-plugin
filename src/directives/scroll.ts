import { ObjectDirective } from 'vue'
import { lock, unlock } from 'tua-body-scroll-lock'

export default {
  mounted(el) {
    lock(el)
  },
  beforeUnmount(el) {
    unlock(el)
  }
} as ObjectDirective
