import { Suspense, lazy } from 'react'
import {
  Navigate,
  useRoutes,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom'

import history from './history'

import Login from '../views/login/Login'
import NewsSandBox from '../views/sandbox/NewsSandBox'
import Home from '../views/sandbox/Home'
const UserList = lazy(() => import('../views/sandbox/UserList'))
const RoleList = lazy(() => import('../views/sandbox/RoleList'))
const RightList = lazy(() => import('../views/sandbox/RightList'))
const NoPermission = lazy(() => import('../views/sandbox/NoPermission'))
const UserRegister = lazy(() => import('../views/register/UserRegister'))
const PersonalUserInfo = lazy(() =>
  import('../components/sandbox/UserInfo/PersonalUserInfo'),
)

const RouterElement = () => {
  const element = useRoutes([
    {
      path: '/login',
      element: <Login />,
    },
    { path: '/user-register', element: <UserRegister /> },

    {
      path: '/',
      element: localStorage.getItem('Authorization') ? (
        <NewsSandBox />
      ) : (
        <Navigate to="/login" replace={true} />
      ),
      children: [
        { path: '/home', element: <Home /> },
        { path: '/personal-userInfo', element: <PersonalUserInfo /> },
        { path: '/user-manage', element: <UserList /> },
        { path: '/role-manage', element: <RoleList /> },
        { path: '/right-manage', element: <RightList /> },
        { path: '*', element: <NoPermission /> },
      ],
    },
  ])
  return element
}

const BaseRouter = () => {
  return (
    <Suspense>
      <HistoryRouter history={history}>
        <RouterElement />
      </HistoryRouter>
    </Suspense>
  )
}
export default BaseRouter
