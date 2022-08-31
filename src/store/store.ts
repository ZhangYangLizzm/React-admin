import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from './userInfoSlice'
import authListReducer from './AuthListSlice'
const store = configureStore({
  reducer: { userInfo: userInfoReducer, auth: authListReducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
