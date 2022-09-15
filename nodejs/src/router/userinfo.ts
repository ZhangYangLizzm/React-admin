import express from 'express'

import {
  validateUserInfo,
  validatePassword,
  validatePicture,
} from '../validation/user'

import {
  userInfoHandler,
  updateUserInfoHandler,
  resetUserPasswordHandler,
  updateUserPictureHandler,
} from '../routerHandler/userinfoHandler'


const router = express.Router()

router.get('/getUserinfo', userInfoHandler)

router.post('/updateUserinfo', validateUserInfo, updateUserInfoHandler)

router.post('/resetUserPassword', validatePassword, resetUserPasswordHandler)

router.post('/updateUserPicture', validatePicture, updateUserPictureHandler)

export default router
