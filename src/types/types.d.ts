import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import store from '@/store/store'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $yup: any
    $formatter: any
    $store: Store<typeof store.state>
    $refs: { [key: string]: Vue | Element | Vue[] | Element[] }
  }
}
