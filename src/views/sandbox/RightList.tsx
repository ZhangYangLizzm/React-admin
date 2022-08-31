import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { selectAuthList } from '../../store/AuthListSlice'
import { Item } from '../../components/sandbox/SideMenu'

const columns: ColumnsType<Item> = [
  {
    title: '菜单项',
    dataIndex: 'label',
    key: 'page',
  },
  {
    title: '路径',
    dataIndex: 'key',
    key: 'path',
  },
  {
    title: '是否拥有',
    dataIndex: 'pagepermission',
    key: 'permission',
  },
]

const RightList = () => {
  const authList = useSelector(selectAuthList)

  return (
    <div>
      <Table
        dataSource={authList}
        columns={columns}
        pagination={{ position: ['bottomCenter'] }}
      />
    </div>
  )
}

export default RightList
