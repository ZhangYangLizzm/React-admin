import express from 'express'
import {
  userInfoHandler,
  updateUserInfoHandler,
  resetUserPasswordHandler,
  updateUserPictureHandler,
  getAuthHandler,
} from '../routerHandler/userinfoHandler'

import {
  validateUserInfo,
  validatePassword,
  validatePicture,
} from '../validation/user'

const router = express.Router()

router.get('/getUserinfo', userInfoHandler)

router.post('/updateUserinfo', validateUserInfo, updateUserInfoHandler)

router.post('/resetUserPassword', validatePassword, resetUserPasswordHandler)

router.post('/updateUserPicture', validatePicture, updateUserPictureHandler)

router.get('/getAuth', getAuthHandler)
export default router
