import api from '@/services/api/api'

export enum Permission {
  CrossSell = 'crossSell'
}

export default {
  async findPermissions(): Promise<Permission[]> {
    return (await api({ url: `/plugin/permissions`, method: 'get' })).data
  }
}
