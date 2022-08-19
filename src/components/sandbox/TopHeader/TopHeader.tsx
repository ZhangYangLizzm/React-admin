import React from 'react'
import { useState } from 'react'

import { Layout } from 'antd'
const { Header } = Layout

import UserDropdown from './UserDropdown'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
const TopHeader = () => {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => setCollapsed(!collapsed),
      })}
      
      <UserDropdown />
    </Header>
  )
}

export default TopHeader
