import { useSelector } from 'react-redux'
import { Button, message, Popconfirm, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { selectAuthList } from '../../store/AuthListSlice'
import { Item } from '../../components/sandbox/SideMenu'

const EditButton: React.FC = () => {
  return (
    <Button shape="circle" type="primary" style={{ marginRight: '8px' }}>
      <EditOutlined />
    </Button>
  )
}
interface DeleteButtonProps {
  itemId: number
}
const DeleteButton: React.FC<DeleteButtonProps> = ({ itemId }) => {
  const text = '你确认要删除这个权限么?'
  const confirm = (itemId: number) => {
    message.info('item: ' + itemId)
  }
  return (
    <Popconfirm
      placement="topLeft"
      title={text}
      onConfirm={() => confirm(itemId)}
      okText="删除"
      cancelText="取消"
    >
      <Button shape="circle" danger icon={<DeleteOutlined />}></Button>
    </Popconfirm>
  )
}

const columns: ColumnsType<Item> = [
  {
    title: '菜单项',
    dataIndex: 'label',
    key: 'page',
  },
  {
    title: '权限路径',
    dataIndex: 'key',
    key: 'path',
    render: (key: string) => {
      return <Tag color="blue">{key}</Tag>
    },
  },
  {
    title: '是否拥有',
    dataIndex: 'pagepermission',
    key: 'permission',
  },
  {
    title: '操作',
    render: (item: Item) => {
      return (
        <div>
          <EditButton />

          <DeleteButton itemId={item.id} />
        </div>
      )
    },
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
