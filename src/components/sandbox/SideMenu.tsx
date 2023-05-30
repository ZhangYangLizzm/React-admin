import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
const { Sider } = Layout

import {
  fetchAuthData,
  selectCollapsed,
  selectFilterAuthList,
} from '../../store/AuthListSlice'
import './SideMenu.css'
import { useEffect } from 'react'
import { useAppDispatch } from '../../store/hooks'

export interface Item {
  id: number
  key: string
  pid: number
  label: string
  pagepermission: number
  children?: Item[]
}

type MenuItem = Required<MenuProps>['items'][number]

const SideMenu = () => {
  const collapsed = useSelector(selectCollapsed)
  const items = useSelector(selectFilterAuthList)

  const navigate = useNavigate()
  const location = useLocation()
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth="70px"
    >
      <div className="logo">{collapsed ? '后台' : '后台系统'}</div>

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
