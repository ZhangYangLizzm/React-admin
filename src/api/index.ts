import { ChangedAuthList } from '../views/sandbox'
import request from './request'

//注册
export const request_register = async (
  username: string,
  email: string,
  account: string,
  password: string,
) => request.post('/api/register', { username, email, account, password })
//登录
export const request_login = async (account: string, password: string) => {
  const res = await request.post('/api/login', { account, password })
  if (res.status === 200) {
    localStorage.setItem('Authorization', res.data.token)
  }
}

//获取用户信息
export const getUserInfoData = async () =>
  request({ url: 'user/getUserinfo', method: 'GET' })

export const updateUserPicture = async (imgFormData: FormData) =>
  request({
    url: 'user/updateUserPicture',
    method: 'POST',
    data: imgFormData,
  })

//获取权限信息
export const getAuthData = async () =>
  request({ url: 'auth/getAuth', method: 'GET' })
//修改权限信息
export const changeAuth = async (changedAuthList: ChangedAuthList) => {
  return request({
    url: `auth/changeAuth`,
    method: 'POST',
    data:  changedAuthList ,
  })
}
