import { configureStore } from "@reduxjs/toolkit";
import excelReducer from "./excel";

const store = configureStore({
  reducer: {
    excel: excelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
