import React, { useState } from 'react'

const ModifyUsername = () => {
  const [username, setUsername] = useState('')
  //用于预览的URL
  const updataUsername = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }
  return (
    <div>
      <form>
        <label>修改昵称：</label>
        <input
          type="text"
          value={username}
          placeholder="修改昵称"
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setUsername((e.target as HTMLInputElement).value)
          }
        />
        <input type="button" value="确认修改" />
      </form>
    </div>
  )
}

export default ModifyUsername
