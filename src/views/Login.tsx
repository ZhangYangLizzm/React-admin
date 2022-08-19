import { useState } from 'react'
import './Login.less'
import { request_login } from '../api'
import { useNavigate } from 'react-router-dom'
const login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const login = async (e: React.MouseEvent) => {
    e.preventDefault()
    const loginStaus = await request_login(username, password)
    loginStaus && navigate('/home')
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
            onInput={(e: any) => setUsername(e.target.value)}
          />
        </p>

        <p>
          密码：
          <input
            type="password"
            placeholder="输入密码"
            value={password}
            onInput={(e: any) => {
              setPassword(e.target.value)
            }}
            autoComplete="true"
          />
        </p>

        <button onClick={login}>登录</button>
      </form>
    </div>
  )
}

export default login
