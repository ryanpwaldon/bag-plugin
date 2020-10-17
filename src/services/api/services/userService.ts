import api from '@/services/api/api'

export default {
  findPlan() {
    return api({ url: `/user/plan`, method: 'get' })
      .then(({ data }) => data)
      .catch(() => null)
  }
}
