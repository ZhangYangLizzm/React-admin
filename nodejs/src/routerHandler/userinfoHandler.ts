import { Response, NextFunction } from 'express'
import { Request as JWTRequest } from 'express-jwt'
import bcrypt from 'bcryptjs'

import database from '../mysql'
const searchByIdSqlStr =
  'select userId,account,username,email,user_picture from users where userId=?'
const setUserInfoByIdSqlStr = 'update users set ? where userId=?'

const userInfoHandler = (
  req: JWTRequest,
  res: Response,
  next: NextFunction,
) => {
  database.query(searchByIdSqlStr, req.auth!.userId, (err, results) => {
    if (err) {
      return next(err)
    }
    if (results.length !== 1) {
      return res.send({ status: 500, message: '获取用户信息错误' })
    }
    res.send({
      status: 200,
      message: '获取用户信息成功',
      data: results[0],
    })
  })
}

const updateUserInfoHandler = (
  req: JWTRequest,
  res: Response,
  next: NextFunction,
) => {
  const { nickname, email } = req.body
  const { userId } = req.auth!
  database.query(
    setUserInfoByIdSqlStr,
    [{ nickname, email }, userId],
    (err, results) => {
      if (err) {
        return next(err)
      }
      return res.send({ status: 200, message: '修改成功' })
    },
  )
}
//重置密码
const resetUserPasswordHandler = (
  req: JWTRequest,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.auth!
  const { password, newPassword } = req.fields!
  database.query(
    'select password from users where userId=?',
    userId,
    (err, results) => {
      if (err) {
        return next(err)
      }

      if (bcrypt.compareSync(password as string, results[0].password)) {
        return res.send({
          status: 405,
          message: '密码错误',
        })
      }
      const newPwd = bcrypt.hashSync(newPassword as string)
      database.query(
        'update users set ? where userId=?',
        [{ password: newPwd }, userId],
        (err, results) => {
          if (err) return next(err)
          return res.send({
            status: 200,
            message: '修改密码成功',
          })
        },
      )
    },
  )
}
//更新头像
const updateUserPictureHandler = (
  req: JWTRequest,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.auth!
  const user_picture = req.fields?.picture

  database.query(
    'update users set ? where userId=?',
    [{ user_picture }, userId],
    (err, results) => {
      if (err) {
        console.log('err', err)
        return next(err)
      }
      return res.send({
        status: 200,
        message: '修改头像成功',
      })
    },
  )
}
//获取权限信息


export {
  userInfoHandler,
  updateUserInfoHandler,
  resetUserPasswordHandler,
  updateUserPictureHandler,
}
