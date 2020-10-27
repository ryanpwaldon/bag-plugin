import { ComponentCustomProperties } from 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $refs: { [key: string]: Vue | Element | Vue[] | Element[] }
  }
}
