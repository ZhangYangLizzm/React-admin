import { useEffect, useState } from 'react'

import { Layout, Menu, MenuItemProps, SiderProps } from 'antd'
import type { MenuProps } from 'antd'
const { Sider } = Layout
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'

import './SideMenu.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuthData } from '../../api'

type MenuItem = Required<MenuProps>['items'][number]

const SideMenu = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    getAuthData().then((res: any) => {
      setItems(res)
    })
  }, [])

  const itemClick = (e: MenuItem) => {
    navigate(`${e!.key}`)
  }
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">全球新闻发布系统</div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/home']}
        selectedKeys={[location.pathname]}
        items={items}
        onClick={itemClick}
      />
    </Sider>
  )
}

export default SideMenu
