import express, {
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
} from 'express'
import cors from 'cors'
import { expressjwt } from 'express-jwt'
import formidable from 'express-formidable'
import { secretKey } from './config'

import userRouter from './router/user'
import swaggerSpec from './swagger'
import swaggerui from 'swagger-ui-express'

import userInfoRouter from './router/userinfo'
import authRouter from './router/auth'

import fileCloudRouter from './router/fileCloud'
const app = express()

// //解析Json
// app.use(express.json({ limit: '1000kb' }))
// //将表单数据转换为Json
// app.use(express.urlencoded({ extended: false, limit: '1000kb' }))
//解析'multipart/form-data'
app.use(formidable({
  multiples:true,
  keepExtensions:true,
}))
//配置跨域
app.use(cors())
//令牌解析
app.use(
  expressjwt({ secret: secretKey, algorithms: ['HS256'] }).unless({
    path: [/^\/news-global\/api\//, /^\/swagger/],
  }),
)
const PREFIX='/news-global'
//路由
app.use(`${PREFIX}/api`, userRouter)
app.use(`${PREFIX}/user`, userInfoRouter)
app.use(`${PREFIX}/auth`, authRouter)
app.use(`${PREFIX}/fileCloud`, fileCloudRouter)

app.use('/swagger', swaggerui.serve, swaggerui.setup(swaggerSpec))
//错误处理回调
const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send({
      status: 401,
      message: '令牌认证失败',
    })
  }
  res.status(500).send({
    status: 500,
    message: '未捕捉到的服务器错误',
  })
}

app.use(errorHandler)

const port = 3000
//打开服务器
app.listen(port, '127.0.0.1', () => {
  console.log(`服务启动于http://127.0.0.1:${port}`)
})
