import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import Nprogress from 'nprogress'
import history from '../router/history'
const request = axios.create({
  baseURL: '/news-global',
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
    //令牌认证失败跳转到登录页
    if (err.response.data.status === 401) {
      history.push('/login')
    }

    return Promise.reject(err)
  },
)

export default request
