import request from './request'
export const request_register = async (username: string, password: string) => {
  const res = await request.post('/register', { username, password })
  if (res.status === 200) return true
  return false
}

export const request_login = async (username: string, password: string) => {
  const res = await request.post('/login', { username, password })
  if (res.status === 200) {
    localStorage.setItem('Authorization', res.data.token)
    return true
  }
  return false
}
