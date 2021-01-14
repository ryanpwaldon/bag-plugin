import store from '@/store/store'
import { Permission } from '@/services/api/services/pluginService'

export const hasCrossSellPermission = () => {
  return store.state.permissions.includes(Permission.CrossSell)
}
