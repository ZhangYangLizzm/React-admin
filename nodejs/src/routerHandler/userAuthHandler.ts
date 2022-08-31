import { Response, NextFunction } from 'express'
import { Request as JWTRequest } from 'express-jwt'
const getAuthHandler = (req: JWTRequest, res: Response, next: NextFunction) => {
  res.send([
    {
      key: '/home',
      label: '首页',
      pagepermission: 1,
    },
    {
      key: '/user',
      label: '用户管理',
      pagepermission: 1,
      children: [
        {
          key: '/user-manage',
          label: '用户列表',
          pagepermission: 1,
        },
      ],
    },
    {
      key: '/role',
      label: '权限管理',
      pagepermission: 1,
      children: [
        {
          key: '/role-manage',
          label: '角色列表',
          pagepermission: 0,
        },
        {
          key: '/right-manage',
          label: '权限列表',
          pagepermission: 1,
        },
      ],
    },
  ])
}
export { getAuthHandler }
