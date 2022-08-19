import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom'
import Login from '../views/Login'
const NewsSandBox = lazy(() => import('../views/sandbox/NewsSandBox'))
const Home = lazy(() => import('../views/sandbox/Home'))
const UserList = lazy(() => import('../views/sandbox/UserList'))
const RoleList = lazy(() => import('../views/sandbox/RoleList'))
const RightList = lazy(() => import('../views/sandbox/RightList'))
const NoPermission = lazy(() => import('../views/sandbox/NoPermission'))

const RouterElement = () => {
  const element = useRoutes([
    { path: '/login', element: <Login /> },
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
