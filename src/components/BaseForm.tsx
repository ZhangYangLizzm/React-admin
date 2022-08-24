import React, { Fragment, useImperativeHandle, useState } from 'react'
import { forwardRef } from 'react'
const BaseForm = forwardRef((_, ref) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  useImperativeHandle(ref, () => ({
    username,
    password,
  }))

  return (
    <Fragment>
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
      </form>
    </Fragment>
  )
})

export default BaseForm
