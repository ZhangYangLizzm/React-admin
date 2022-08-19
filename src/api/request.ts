import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import Nprogress from 'nprogress'

const request = axios.create({
  baseURL: '/api',
})

request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers!['Authorization'] =
      localStorage.getItem('Authorization') || ''
    Nprogress.start()
    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)

request.interceptors.response.use(
  (response: AxiosResponse) => {
    Nprogress.done()
    return response.data
  },
  (err) => {
    return Promise.reject(err)
  },
)

export default request
