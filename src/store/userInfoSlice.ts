//获取用户个人信息
import { getUserInfoData } from '../api/index'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from './store'

export const fetchUserInfo = createAsyncThunk(
  'userInfo/fetchUserInfo',
  async () => {
    const response = await getUserInfoData()
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
}
const initialState: UserInfoState = {
  userInfoData: {
    username: '',
    email: '',
  },
}
export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.userInfoData = action.payload
    })
  },
})

export const selectUserInfoData = (state: RootState) =>
  state.userInfo.userInfoData

export const selectUserName = (state: RootState) =>
  state.userInfo.userInfoData.username

export const selectUserAvatar = (state: RootState) =>
  state.userInfo.userInfoData.user_picture

export default userInfoSlice.reducer
