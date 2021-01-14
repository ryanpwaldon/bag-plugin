import api from '@/services/api/api'

export enum Permission {
  CrossSell = 'crossSell'
}

type PluginSettings = {
  active: boolean
  permissions: Permission[]
}

export default {
  async findSettings(): Promise<PluginSettings> {
    return (await api({ url: `/plugin`, method: 'get' })).data
  }
}
