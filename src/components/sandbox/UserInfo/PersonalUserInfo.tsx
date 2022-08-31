import { useSelector } from 'react-redux'
import { Button } from 'antd'
import { Descriptions } from 'antd'
import { selectUserInfoData } from '../../../store/userInfoSlice'
import './PersonalUserInfo.less'
import ModifyUserPicture from './ModifyUserInfo/ModifyUserPicture'
import { useState } from 'react'
const PersonalUserInfo = () => {
  const userInfos = useSelector(selectUserInfoData)
  const [changing, setChanging] = useState(false)
  const content = (
    <Descriptions title="User info" style={{ width: '700px' }} bordered={true}>
      <Descriptions.Item label="Avatar">
        <img src={userInfos.user_picture} alt="" style={{ width: '100px' }} />
      </Descriptions.Item>
      <Descriptions.Item label="UserID">{userInfos.userId}</Descriptions.Item>
      <Descriptions.Item label="Account">{userInfos.account}</Descriptions.Item>
      <Descriptions.Item label="Email">{userInfos.email}</Descriptions.Item>
      <Descriptions.Item label="Username">
        {userInfos.username}
      </Descriptions.Item>
    </Descriptions>
  )

  return (
    <div id="PersonalUserInfo">
      {content}
      <div id="changeUserInfo">
        <Button type="primary" onClick={() => setChanging(!changing)}>
          修改个人信息
        </Button>
      </div>
      {changing && <ModifyUserPicture />}
    </div>
  )
}

export default PersonalUserInfo
