import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { request_register } from '../../api'
const userRegister = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const canRegister = password === confirmPassword ? false : true
  const tryRegister = async (e: React.MouseEvent) => {
    e.preventDefault()
    const registerStatus = await request_register(username, password)
    if (registerStatus) {
      navigate('/login')
      return
    }
  }
  return (
    <div id="register">
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
        <p>
          再次确认密码：
          <input
            type="password"
            placeholder="输入密码"
            value={confirmPassword}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              setConfirmPassword((e.target as HTMLInputElement).value)
            }}
            autoComplete="true"
          />
        </p>
        <button onClick={tryRegister} disabled={canRegister}>
          注册
        </button>
      </form>
    </div>
  )
}

export default userRegister
