import { useState } from 'react'

import { Layout, Menu, MenuItemProps, SiderProps } from 'antd'
import type { MenuProps } from 'antd'
const { Sider } = Layout
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'

import './SideMenu.css'
import { useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

const SideMenu = () => {
  const items = [
    {
      key: '/home',
      icon: <UserOutlined />,
      label: '首页',
    },
    {
      key: '/user',
      icon: <VideoCameraOutlined />,
      label: '用户管理',
      children: [
        {
          key: '/user-manage',
          label: '用户列表',
        },
      ],
    },
    {
      key: '/role',
      icon: <UploadOutlined />,
      label: '权限管理',
      children: [
        {
          key: '/role-manage',
          label: '角色列表',
        },
        {
          key: '/right-manage',
          label: '权限列表',
        },
      ],
    },
  ]
  const navigate = useNavigate()

  const itemClick = (e: MenuItem) => {
    navigate(`${e!.key}`)
  }
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">全球新闻发布系统</div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
        onClick={itemClick}
      />
    </Sider>
  )
}

export default SideMenu
