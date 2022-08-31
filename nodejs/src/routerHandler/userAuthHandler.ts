import { Response, NextFunction } from 'express'
import { Request as JWTRequest } from 'express-jwt'
import database from '../mysql'
const getAuthHandler = (req: JWTRequest, res: Response, next: NextFunction) => {
  database.query('select * from permission', (err, results) => {
    if (err) {
      return next(err)
    }
    return res.send({
      status: 200,
      message: '获取成功',
      data: results,
    })
  })
}
export { getAuthHandler }
