import comms from '@/services/comms/comms'
import axios from 'axios'
import qs from 'qs'

const api = axios.create({
  baseURL: process.env.VUE_APP_SERVER_URL
})

api.interceptors.request.use(config => {
  config.headers['shop-origin'] = comms?.getShopOrigin()
  config.paramsSerializer = params => qs.stringify(params, { encode: false, skipNulls: true })
  return config
})

export default api
