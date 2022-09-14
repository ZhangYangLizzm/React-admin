import React from 'react'
import { Link } from 'react-router-dom'

import { Dropdown, Space, Menu, Avatar } from 'antd'
import { SmileOutlined, UserOutlined, DownOutlined } from '@ant-design/icons'

import { useAppSelector } from '../../../store/hooks'
import { selectUserName, selectUserAvatar } from '../../../store/userInfoSlice'

import history from '../../../router/history'
const UserDropdown = () => {
  const username = useAppSelector(selectUserName)
  const userAvatar = useAppSelector(selectUserAvatar)
  const exitLogin = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    localStorage.removeItem('Authorization')
    history.replace('/login')
  }
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: <Link to="/personal-userInfo">个人信息</Link>,
        },
        {
          key: '2',
          label: <a onClick={exitLogin}>退出</a>,
          icon: <SmileOutlined />,
          danger: true,
        },
      ]}
    />
  )
  return (
    <div style={{ float: 'right' }}>
      <Dropdown overlay={menu}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar size={36} icon={<UserOutlined />} src={userAvatar} />
            {username}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  )
}

export default UserDropdown
