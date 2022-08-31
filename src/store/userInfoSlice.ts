import { getAuthData } from './../api/index'
import { getUserInfoData } from '../api/index'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from './store'
import { Item } from '../components/sandbox/SideMenu'

export const fetchUserInfo = createAsyncThunk(
  'userInfo/fetchUserInfo',
  async () => {
    const response = await getUserInfoData()
    return response.data
  },
)

export const fetchAuthData = createAsyncThunk(
  'authData/fetchAuthData',
  async () => {
    const response = await getAuthData()
    return response.data
  },
)

interface UserInfoState {
  userInfoData: {
    username: string
    email: string
    user_picture?: string
    userId?: number
    account?: string
  }

  authList: Item[]
}
const initialState: UserInfoState = {
  userInfoData: {
    username: '',
    email: '',
  },
  authList: [],
}
export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.userInfoData = action.payload
      })
      .addCase(fetchAuthData.fulfilled, (state, action) => {
        state.authList = action.payload
      })
  },
})

export const selectUserInfoData = (state: RootState) =>
  state.userInfo.userInfoData

export const selectUserName = (state: RootState) =>
  state.userInfo.userInfoData.username

export const selectUserAvatar = (state: RootState) =>
  state.userInfo.userInfoData.user_picture

export const selectAuthList = (state: RootState) => state.userInfo.authList
export default userInfoSlice.reducer
