import { Copy } from '@/plugins/copy'
import { ComponentCustomProperties } from 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $copy: Copy
  }
}
