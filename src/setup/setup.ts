import store from '@/store/store'
import pluginService from '@/services/api/services/pluginService'

export default async (): Promise<boolean> => {
  const { active, permissions } = await pluginService.findSettings()
  if (!active) return false
  store.commit('setPermissions', permissions)
  return true
}
