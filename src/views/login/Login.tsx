import { Link, useNavigate } from 'react-router-dom'
import React, { Fragment, useState } from 'react'
import md5 from 'crypto-js/md5'
import { request_login } from '../../api'
import { Button } from 'antd'
import './Login.less'

interface LoginContentProps {
  account: string;
  password: string;
  onAccountInput: (e: React.FormEvent<HTMLInputElement>) => void;
  onPasswordInput: (e: React.FormEvent<HTMLInputElement>) => void;
}

const LoginContent: React.FunctionComponent<LoginContentProps> = (props) => {
  return (
    <Fragment>
      <div className="form-item">
        <label className="form-label">Username</label>
        <input
          type="text"
          placeholder="Username"
          value={props.account}
          onInput={props.onAccountInput}
        />
      </div>
      <div className="form-item">
        <label className="form-label">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={props.password}
          onInput={props.onPasswordInput}
          autoComplete="true"
        />
      </div>
    </Fragment>
  )
}
const LinkToRegister = () => {
  return (
    <div className="form-item">
      <Link to="/user-register">注册新账号?</Link>
    </div>
  )
}
const LoginForm = () => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const onAccountInput = (e: React.FormEvent<HTMLInputElement>) =>
    setAccount((e.target as HTMLInputElement).value)
  const onPasswordInput = (e: React.FormEvent<HTMLInputElement>) => setPassword((e.target as HTMLInputElement).value)

  const navigate = useNavigate()
  const handleLogin = async () => {
    try {
      await request_login(account, md5(password).toString())
      navigate('/home')
    } catch (err) {
      setErrorMessage((err as any).response.data)
    }
  }



  return (
    <div id="Login">
      <form>
        <LoginContent {...{ account, password, onAccountInput, onPasswordInput }} />
        <div className="form-item">
          <p>{errorMessage}</p>
          <Button onClick={handleLogin} type="primary">
            Log in
          </Button>
        </div>
        <LinkToRegister />
      </form>
    </div>


  )
}

export default LoginForm
