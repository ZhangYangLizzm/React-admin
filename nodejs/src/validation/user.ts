import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

const account = Joi.string().alphanum().min(1).max(10).required()
const username = Joi.string().min(1).max(10).required()
const password = Joi.string().min(6).max(90).required()

// const newPassword = Joi.not(Joi.ref(password)).concat(password as any)
// const userId = Joi.number().min(1).required()
const nickname = Joi.string().required().min(1).max(10)
const email = Joi.string().email().required()
const picture = Joi.string().dataUri().required()

const UserRegisterScheme = Joi.object({
  account,
  password,
  username,
  email,
})

const UserLoginScheme = Joi.object({
  account,
  password,
})
const setUserScheme = Joi.object({
  // userId,
  nickname,
  email,
})

const setNewPasswordScheme = Joi.object({
  password,
  newPassword: Joi.not(Joi.ref('password')).concat(password as any),
})

const validateUserInfo = (req: Request, res: Response, next: NextFunction) => {
  const { error } = setUserScheme.validate(req.body)
  if (error) {
    return res.send({ status: 500, message: error.message })
  }
  next()
}
const validateUserRegister = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = UserRegisterScheme.validate(req.body)
  if (error) {
    return res.send({ status: 500, message: error.message })
  }
  next()
}
const validateUserLogin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = UserLoginScheme.validate(req.body)
  if (error) {
    return res.send({ status: 500, message: error.message })
  }
  next()
}

const validatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { error } = setNewPasswordScheme.validate(req.body)
  if (error) {
    return res.send({ status: 500, message: error.message })
  }
  next()
}

const validatePicture = (req: Request, res: Response, next: NextFunction) => {
  const { error } = picture.validate(req.body.picture)
  if (error) {
    return res.status(405).send({ status: 500, message: error.message })
  }
  next()
}
export {
  validateUserInfo,
  validateUserRegister,
  validateUserLogin,
  validatePassword,
  validatePicture,
}
