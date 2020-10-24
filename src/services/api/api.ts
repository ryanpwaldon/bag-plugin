import qs from 'qs'
import axios from 'axios'
import { comms } from '@/services/comms/comms'

const api = axios.create({
  baseURL: process.env.VUE_APP_SERVER_URL
})

api.interceptors.request.use(async config => {
  const { getShopOrigin } = await comms
  config.params.shopOrigin = getShopOrigin()
  config.paramsSerializer = params => qs.stringify(params, { encode: false, skipNulls: true })
  return config
})

export default api
