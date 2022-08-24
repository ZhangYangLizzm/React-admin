import ModifyUsername from './ModifyUsername'
import ModifyUserPicture from './ModifyUserPicture'
import './ModifyUserInfo.less'
const ModifyUserInfo = () => {
  return (
    <div id="modify-user-info">
      <ModifyUserPicture />
      <ModifyUsername />
    </div>
  )
}

export default ModifyUserInfo
