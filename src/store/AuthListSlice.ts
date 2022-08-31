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
      state.authList = action.payload
    })
  },
})

export const { changeCollapsed } = authListSlice.actions

export const selectCollapsed = (state: RootState) => state.auth.collapsed

export const selectAuthList = (state: RootState) => state.auth.authList

const filterAuthList = (authData: Item[]) => {
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
  return items
}
//递归过滤权限列表
export const selectFilterAuthList = (state: RootState) => {
  const authList = JSON.parse(JSON.stringify(state.auth.authList))
  return filterAuthList(authList) as Item[]
}
export default authListSlice.reducer
