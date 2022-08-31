import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
const { Sider } = Layout
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'

import {
  selectAuthList,
  selectCollapsed,
  selectFilterAuthList,
} from '../../store/AuthListSlice'
import './SideMenu.css'
import { RootState } from '../../store/store'

export interface Item {
  key: string
  label: string
  pagepermission: number
  children?: Item[]
}

type MenuItem = Required<MenuProps>['items'][number]

const SideMenu = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const collapsed = useSelector(selectCollapsed)
  const items = useSelector(selectFilterAuthList)

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">全球新闻发布系统</div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/home']}
        selectedKeys={[location.pathname]}
        items={items}
        onClick={(e: MenuItem) => navigate(`${e!.key}`)}
      />
    </Sider>
  )
}

export default SideMenu
