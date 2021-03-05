import api from '@/services/api/api'

export enum Permission {
  CrossSell = 'crossSell',
  Reward = 'reward'
}

export default {
  async findPermissions(): Promise<Permission[]> {
    return (await api({ url: `/plugin/permissions`, method: 'get' })).data
  }
}
