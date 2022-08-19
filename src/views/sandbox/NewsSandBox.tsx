import { Outlet } from 'react-router-dom'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader/TopHeader'
import { Layout } from 'antd'
import './NewsSandbox.css'
const { Content } = Layout
const NewsSandBox = () => {
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
