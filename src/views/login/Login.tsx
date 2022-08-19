import './Login.less'
import { request_login } from '../../api'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
const login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const tryLogin = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      const loginStaus = await request_login(username, password)
      loginStaus && navigate('/home')
    } catch (err:any) {
      alert(err.response.data)
    }
  }
  const jumpRegister = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate('/user-register')
  }
  return (
    <div id="Login">
      <form>
        <p>
          账号：
          <input
            type="text"
            placeholder="输入账号"
            value={username}
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              setUsername((e.target as HTMLInputElement).value)
            }
          />
        </p>
        <p>
          密码：
          <input
            type="password"
            placeholder="输入密码"
            value={password}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              setPassword((e.target as HTMLInputElement).value)
            }}
            autoComplete="true"
          />
        </p>
        <button onClick={tryLogin}>登录</button>
        <button onClick={jumpRegister}>注册</button>
      </form>
    </div>
  )
}

export default login
