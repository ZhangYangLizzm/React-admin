import { Outlet } from 'react-router-dom'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader/TopHeader'
import { Layout } from 'antd'
import './NewsSandbox.css'
import { useEffect } from 'react'
import { fetchAuthData } from '../../store/AuthListSlice'
import { useAppDispatch } from '../../store/hooks'
import { fetchUserInfo } from '../../store/userInfoSlice'
const { Content } = Layout
const NewsSandBox = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchAuthData())
    dispatch(fetchUserInfo())
  }, [dispatch])
  return (
    <Layout>
      <SideMenu />
      <Layout className="site-layout">
        <TopHeader />
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
export default NewsSandBox
