import { createStore } from 'vuex'
import { Permission } from '@/services/api/services/pluginService'

export default createStore({
  state: {
    permissions: [] as Permission[]
  },
  mutations: {
    setPermissions(state, value) {
      state.permissions = value
    }
  }
})
