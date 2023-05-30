import { ChangedAuthList } from '../views/sandbox/type'
import fileUploadService from './fileCloud'
import request from './request'

//注册
const request_register = async (
  username: string,
  email: string,
  account: string,
  password: string,
) => request.post('/api/register', { username, email, account, password })
//登录
const request_login = async (account: string, password: string) => {
  const res = await request.post('/api/login', { account, password })
  if (res.status === 200) {
    localStorage.setItem('Authorization', res.data.token)
  }
}

//获取用户信息
const getUserInfoData = async () =>
  request({ url: 'user/getUserinfo', method: 'GET' })

const updateUserPicture = async (imgFormData: FormData) =>
  request({
    url: 'user/updateUserPicture',
    method: 'POST',
    data: imgFormData,
  })

//获取权限信息
const getAuthData = async () =>
  request({ url: 'auth/getAuth', method: 'GET' })
//修改权限信息
const modifyAuth = async (changedAuthList: ChangedAuthList) => {
  return request({
    url: `auth/changeAuth`,
    method: 'POST',
    data:  changedAuthList ,
  })
}

export {
  request_register,
  request_login,
  getUserInfoData,
  updateUserPicture,
  getAuthData,
  modifyAuth,
  fileUploadService
}