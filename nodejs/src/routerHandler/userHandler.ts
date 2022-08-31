import database from '../mysql'
import bcrypt from 'bcryptjs'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { secretKey, expiresIn } from '../config'

const insertStr = 'insert into users set ?'
const searchByUserNameSqlStr = 'select * from users where account=?'

const sendStr = (err: string, status = 500) => {
  return {
    status,
    err: err,
  }
}

const registerHandler = (req: Request, res: Response, next: NextFunction) => {
  const userinfo = req.fields!

  database.query(searchByUserNameSqlStr, userinfo.account, (err, results) => {
    if (err) {
      return next(err)
    }
    if (results.length) {
      return res.status(412).send(sendStr('用户名已被占用', 417))
    }
    userinfo.password = bcrypt.hashSync(userinfo.password as string, 10)
    database.query(insertStr, userinfo, (err, results) => {
      if (err) {
        return next(err)
      }
      if (results.affectedRows !== 1) {
        return res.status(500).send(sendStr('注册失败'))
      }
      res.send({
        status: 200,
        message: '注册成功',
      })
    })
  })
}

const loginHandler = (req: Request, res: Response, next: NextFunction) => {
  const userinfo = req.fields!
  database.query(searchByUserNameSqlStr, userinfo.account, (err, results) => {
    if (err) {
      return next(err)
    }
    if (results.length !== 1) {
      return res.status(400).send('用户名不存在')
    }
    const flag = bcrypt.compareSync(
      userinfo.password as string,
      results[0].password,
    )
    if (!flag) {
      return res.status(400).send('用户密码错误')
    }
    const user = { ...results[0], password: '', user_picture: '' }
    const tokenStr = jwt.sign(user, secretKey, { expiresIn })
    return res.send({
      status: 200,
      message: '登录成功',
      data: {
        token: 'Bearer ' + tokenStr,
      },
    })
  })
}

export { registerHandler, loginHandler }
