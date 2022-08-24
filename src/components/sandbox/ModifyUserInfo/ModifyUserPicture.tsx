import React, { useState } from 'react'
import { updateUserPicture } from '../../../api'
import { fetchUserInfo } from '../../../store/userInfoSlice'
import { useAppDispatch } from '../../../store/hooks'

const ModifyUserPicture = () => {
  //用于预览的URL
  const [imgFileURL, setImgFileURL] = useState<string | null>(null)
  let [ImgBase64Data, setImgBase64Data] = useState('')
  const dispatch = useAppDispatch()

  const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement
    const files = (e.target as HTMLInputElement).files
    if (files && files[0]) {
      const file = files[0]
      if (file.size > 1024 * 1024) {
        input.value = ''
        confirm('文件大小不能超过1M')
        return false
      }
      const reader = new FileReader()
      setImgFileURL(URL.createObjectURL(file))
      reader.onload = (e: ProgressEvent<FileReader>) => {
        e.target && setImgBase64Data(e.target.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const submitPicture = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await updateUserPicture(ImgBase64Data)
    //更新后拉取新的用户信息
    dispatch(fetchUserInfo())
  }

  return (
    <div>
      <form>
        <div>
          <div>
            {imgFileURL && <img src={imgFileURL} style={{ width: '100px' }} />}
          </div>
          <label>修改头像：</label>
          <input type="file" id="picture" onChange={handleFileChange} />
        </div>
        <button onClick={submitPicture}>提交</button>
      </form>
    </div>
  )
}

export default ModifyUserPicture
