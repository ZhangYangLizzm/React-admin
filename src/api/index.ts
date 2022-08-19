import request from './request'
import { useNavigate } from 'react-router-dom'
export const request_login = async (username: string, password: string) => {
  const res = await request.post('/login', { username, password })
  if (res.status === 200) {
    localStorage.setItem('Authorization', res.data.token)
    return true
  }
  return false
}
