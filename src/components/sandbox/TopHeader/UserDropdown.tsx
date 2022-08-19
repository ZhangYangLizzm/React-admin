import { Dropdown, Space, Menu, Avatar } from 'antd'

import { SmileOutlined, UserOutlined, DownOutlined } from '@ant-design/icons'
const UserDropdown = () => {
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              超级管理员
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.aliyun.com"
            >
              退出
            </a>
          ),
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
            <Avatar size={36} icon={<UserOutlined />} />
            张殃离
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  )
}

export default UserDropdown
