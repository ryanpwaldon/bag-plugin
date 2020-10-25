import qs from 'qs'
import axios from 'axios'
import { comms } from '@/services/comms/comms'

const api = axios.create({
  baseURL: process.env.VUE_APP_SERVER_URL
})

api.interceptors.request.use(async config => {
  config.headers['shop-origin'] = await (await comms).getShopOrigin()
  config.paramsSerializer = params => qs.stringify(params, { encode: false, skipNulls: true })
  return config
})

export default api
