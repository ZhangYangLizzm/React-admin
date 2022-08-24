import './Login.less'
import { request_login } from '../../api'
import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import md5 from 'crypto-js/md5'

const login = () => {
  const navigate = useNavigate()
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const tryLogin = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await request_login(account, md5(password).toString())
      navigate('/home')
    } catch (err) {
      alert((err as any).response.data)
    }
  }
  return (
    <div id="Login">
      <form>
        <div className="form-item">
          <label className="form-label">Username</label>
          <input
            type="text"
            placeholder="Username"
            value={account}
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              setAccount((e.target as HTMLInputElement).value)
            }
          />
        </div>
        <div className="form-item">
          <label className="form-label">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              setPassword((e.target as HTMLInputElement).value)
            }}
            autoComplete="true"
          />
        </div>
        <div className="form-item">
          <button onClick={tryLogin}>Log in</button>
          <div>
            <Link to="/user-register">注册新账号?</Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default login
