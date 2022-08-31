import React, { useState } from 'react'
import { updateUserPicture } from '../../../../api'
import { fetchUserInfo } from '../../../../store/userInfoSlice'
import { useAppDispatch } from '../../../../store/hooks'
import { Button } from 'antd'
import './ModifyUserPicture.less'
const getBase64 = (img: File, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const ModifyUserPicture = () => {
  //用于预览的URL
  const [imgFileURL, setImgFileURL] = useState<string | null>(null)
  let [ImgBase64Data, setImgBase64Data] = useState('')
  const dispatch = useAppDispatch()

  const test = () => {
    document.getElementById('picture')?.click()
  }
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
      getBase64(file, (url) => {
        setImgFileURL(url)
        setImgBase64Data(url)
      })
    }
  }

  const submitPicture = async (e: React.MouseEvent) => {
    e.preventDefault()
    const imgFormData = new FormData()
    imgFormData.append('picture', ImgBase64Data)
    await updateUserPicture(imgFormData)
    //更新后拉取新的用户信息
    dispatch(fetchUserInfo())
  }

  return (
    <div id="modify-user-picture">
      <form>
        <div>
          <label>选择图片:</label>
          <div className="upLoadImg" onClick={test}>
            <span role="button" className="uploadSpan">
              <input type="file" id="picture" onChange={handleFileChange} />
              {imgFileURL ? (
                <img src={imgFileURL} />
              ) : (
                <div id="loading">
                  <span>+</span>
                  <div>Upload</div>
                </div>
              )}
            </span>
          </div>
        </div>
        <Button type="primary" onClick={submitPicture} className="submitButton">
          上传头像
        </Button>
      </form>
    </div>
  )
}

export default ModifyUserPicture
