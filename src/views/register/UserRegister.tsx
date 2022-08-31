import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { request_register } from '../../api'
import md5 from 'crypto-js/md5'
import './UserRegister.less'
import history from '../../router/history'
const userRegister = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const tryRegister = async (e: React.MouseEvent) => {
    e.preventDefault()

    await request_register(username, email, account, md5(password).toString())
    navigate('/login')
  }

  return (
    <div id="register">
      <form>
        <div>
          <label> 用户名：</label>
          <input
            type="text"
            placeholder="用户名"
            value={username}
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              setUsername((e.target as HTMLInputElement).value)
            }
          />
        </div>
        <div>
          <label> 邮箱：</label>
          <input
            placeholder="输入邮箱"
            value={email}
            type="email"
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              setEmail((e.target as HTMLInputElement).value)
            }
          />
        </div>
        <div>
          <label> 账号：</label>
          <input
            type="text"
            placeholder="输入账号"
            value={account}
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              setAccount((e.target as HTMLInputElement).value)
            }
          />
        </div>
        <div>
          <label> 密码：</label>
          <input
            type="password"
            placeholder="输入密码"
            value={password}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              setPassword((e.target as HTMLInputElement).value)
            }}
            autoComplete="true"
          />
        </div>
        <div>
          <label>确认密码：</label>
          <input
            type="password"
            placeholder="确认密码"
            value={confirmPassword}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              setConfirmPassword((e.target as HTMLInputElement).value)
            }}
            autoComplete="true"
          />
        </div>
        <button onClick={() => history.push('/login')}>返回登录页</button>
        <button onClick={tryRegister}>注册</button>
      </form>
    </div>
  )
}

export default userRegister
