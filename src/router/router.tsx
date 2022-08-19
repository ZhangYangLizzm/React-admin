import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandBox from '../views/sandbox/NewsSandBox'
import Home from '../views/sandbox/Home'
import UserList from '../views/sandbox/UserList'
import RoleList from '../views/sandbox/RoleList'
import RightList from '../views/sandbox/RightList'
import NoPermission from '../views/sandbox/NoPermission'
import UserRegister from '../views/register/UserRegister'
// const NewsSandBox = lazy(() => import('../views/sandbox/NewsSandBox'))
// const Home = lazy(() => import('../views/sandbox/Home'))
// const UserList = lazy(() => import('../views/sandbox/UserList'))
// const RoleList = lazy(() => import('../views/sandbox/RoleList'))
// const RightList = lazy(() => import('../views/sandbox/RightList'))
// const NoPermission = lazy(() => import('../views/sandbox/NoPermission'))

const RouterElement = () => {
  const element = useRoutes([
    { path: '/login', element: <Login /> },
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
      <BrowserRouter>
        <RouterElement />
      </BrowserRouter>
    </Suspense>
  )
}
export default BaseRouter
