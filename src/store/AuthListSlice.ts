import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAuthData } from '../api'
import { Item } from '../components/sandbox/SideMenu'
import { RootState } from './store'
//获取当前用户的权限信息
interface State {
  authList: Item[]
  collapsed: boolean
}

const initialState: State = {
  authList: [],
  collapsed: false,
}

//扁平化结果转树形结构 arrayToTree
const arrayToTree = (arr: Item[], id: number): Item[] => {
  const res = []
  for (const item of arr) {
    if (item.pid === id) {
      // 找到当前id的子元素
      // 插入子元素，每个子元素的children通过回调生成
      const children = arrayToTree(arr, item.id)
      if (children.length !== 0) {
        res.push({ ...item, children: arrayToTree(arr, item.id) })
      } else {
        res.push(item)
      }
    }
  }
  return res
}

export const fetchAuthData = createAsyncThunk(
  'authData/fetchAuthData',
  async () => {
    const response = await getAuthData()
    return response.data
  },
)

export const authListSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAuthData.fulfilled, (state, action) => {
      state.authList = arrayToTree(action.payload, 0)
    })
  },
})

export const { changeCollapsed } = authListSlice.actions

export const selectCollapsed = (state: RootState) => state.auth.collapsed

export const selectAuthList = (state: RootState) => state.auth.authList

//递归过滤权限列表

const filterAuthList = (authData: Item[]): Item[] => {
  const items = authData.map((item) => {
    if (item.pagepermission) {
      if (item.children) {
        item.children = filterAuthList(item.children) as Item[]
      }
      return item
    } else {
      return undefined
    }
  })
  return items as Item[]
}

export const selectFilterAuthList = (state: RootState) => {
  const authList = JSON.parse(JSON.stringify(state.auth.authList))
  return filterAuthList(authList)
}
export default authListSlice.reducer
