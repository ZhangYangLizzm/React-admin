import express, {
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
} from 'express'
import cors from 'cors'
import { expressjwt } from 'express-jwt'
import { secretKey } from './config'

import userRouter from './router/user'
import swaggerSpec from './swagger'
import swaggerui from 'swagger-ui-express'

import userInfoRouter from './router/userinfo'
const app = express()
//响应json和表单
app.use(express.json())
app.use(express.urlencoded({ extended: false, limit: Math.pow(1024, 16) }))
//跨域
app.use(cors())
//令牌解析
app.use(
  expressjwt({ secret: secretKey, algorithms: ['HS256'] }).unless({
    path: [/^\/news-global\/api\//, /^\/swaggerDocs\//],
  }),
)
//路由
app.use('/news-global/api', userRouter)
app.use('/news-global/user', userInfoRouter)
app.use('/swaggerDocs', swaggerui.serve, swaggerui.setup(swaggerSpec))
//错误处理回调
const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send({
      status: 401,
      message: '令牌认证失败',
    })
  }
  res.send({
    status: 500,
    message: '服务器错误',
  })
}

app.use(errorHandler)

const port = 3000
//打开服务器
app.listen(port, '127.0.0.1', () => {
  console.log(`服务启动于http://127.0.0.1:${port}`)
})
