import express from 'express'
import {
  getAuthHandler,
  setAuthHandler,
} from '../routerHandler/userAuthHandler'

const router = express.Router()

router.get('/getAuth', getAuthHandler)

router.post('/changeAuth', setAuthHandler)

export default router
