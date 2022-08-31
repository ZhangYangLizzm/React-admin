import React from 'react'
import { useState } from 'react'
import { Layout } from 'antd'
const { Header } = Layout

import UserDropdown from './UserDropdown'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../store/hooks'
import { changeCollapsed, selectCollapsed } from '../../../store/AuthListSlice'
import { useSelector } from 'react-redux'

const TopHeader = () => {
  const collapsed = useSelector(selectCollapsed)
  const dispatch = useAppDispatch()
  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => dispatch(changeCollapsed()),
      })}

      <UserDropdown />
    </Header>
  )
}

export default TopHeader
