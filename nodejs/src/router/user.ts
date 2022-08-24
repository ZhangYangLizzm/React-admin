import express from 'express'
import { registerHandler, loginHandler } from '../routerHandler/userHandler'
import { validateUserLogin, validateUserRegister } from '../validation/user'

const router = express.Router()
/**
 * @swagger
 * /api/register:
 *  post:
 *    tags:
 *      - 用户
 *    summary: 用户注册
 *    description: 用户使用账号密码进行注册
 *    parameters:
 *      - username: 用户名字
 *        password: 用户密码
 *        in: query
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: 注册成功
 */

router.post('/register', validateUserRegister, registerHandler)

router.post('/login', validateUserLogin, loginHandler)

export default router
