import { useSelector } from 'react-redux'
import { Button, Switch, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { debounce } from 'lodash'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { fetchAuthData, selectAuthList } from '../../store/AuthListSlice'
import { Item } from '../../components/sandbox/SideMenu'
import { ActionProps, ChangedAuthList } from '.'
import { changeAuth } from '../../api'
import { useAppDispatch } from '../../store/hooks'

let changedAuthList: ChangedAuthList = []
const Action: React.FC<ActionProps> = ({ item }) => {
  const checkedChange = debounce((itemId: number, checked: boolean) => {
    let exist: boolean | null = false
    let pagepermission = checked ? 1 : 0
    //如果有则修改值
    changedAuthList.map((changedAuthItem) => {
      if (changedAuthItem[0] === itemId) {
        changedAuthItem[1] = pagepermission
        exist = true
      }
    })
    //没有则push进去
    if (!exist) {
      changedAuthList.push([itemId, pagepermission])
      exist = null
    }
  }, 500)
  return (
    <Switch
      checkedChildren={<CheckOutlined />}
      unCheckedChildren={<CloseOutlined />}
      defaultChecked={item.pagepermission}
      onChange={(checked) => checkedChange(item.id, checked)}
    />
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
    render: (key: string) => <Tag color="blue">{key}</Tag>,
  },
  {
    title: '是否拥有',
    dataIndex: 'pagepermission',
    key: 'permission',
    render: (pagepermission: number) => (
      <div>{pagepermission ? '是' : '否'}</div>
    ),
  },
  {
    title: '操作',
    render: (item: Item) => <Action item={item} />,
  },
]

const RightList = () => {
  const authList = useSelector(selectAuthList)
  const dispatch = useAppDispatch()
  return (
    <div>
      <Button
        type="primary"
        style={{ float: 'right', marginBottom: '10px' }}
        onClick={() => {
          console.log(changedAuthList)
          changeAuth(changedAuthList)
          dispatch(fetchAuthData)
        }}
      >
        确认修改
      </Button>
      <Table
        dataSource={authList}
        columns={columns}
        pagination={{ position: ['bottomCenter'] }}
      />
    </div>
  )
}

export default RightList
