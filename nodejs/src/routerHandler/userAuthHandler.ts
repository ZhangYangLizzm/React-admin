import { Response, NextFunction } from 'express'
import { Request as JWTRequest } from 'express-jwt'
import database from '../mysql'
import { arrayToTree } from '../utils'

const getAuthHandler = (req: JWTRequest, res: Response, next: NextFunction) => {
  database.query('select * from permission', (err, results) => {
    if (err) {
      return next(err)
    }
    return res.send({
      status: 200,
      message: '获取用户权限成功',
      data: arrayToTree(results, 0),
    })
  })
}

type ChangedAuthList = number[][]
interface myFields {
  changedAuthList: ChangedAuthList
}
const setAuthHandler = (req: JWTRequest, res: Response, next: NextFunction) => {
  const { changedAuthList } = (req.fields as unknown) as myFields

  database.query(
    'update permission set pagepermission=0 where id=?',
    changedAuthList,
    (err, results) => {
      if (err) {
        return next(err)
      }
      return res.send({
        status: 200,
        message: '修改权限成功',
      })
    },
  )
}
export { getAuthHandler, setAuthHandler }
