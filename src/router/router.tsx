import { Suspense } from 'react'
import {
  Navigate,
  useRoutes,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom'

import history from './history'

import Login from '../views/login/Login'
import NewsSandBox from '../views/sandbox/NewsSandBox'
import Home from '../views/sandbox/Home'
import UserList from '../views/sandbox/UserList'
import RoleList from '../views/sandbox/RoleList'
import RightList from '../views/sandbox/RightList'
import NoPermission from '../views/sandbox/NoPermission'
import UserRegister from '../views/register/UserRegister'
import PersonalUserInfo from '../components/sandbox/PersonalUserInfo'
import ModifyUserInfo from '../components/sandbox/ModifyUserInfo/ModifyUserInfo'
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
        {
          path: '/modify-userInfo',
          element: <ModifyUserInfo />,
        },
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
