import { excelDataType } from "@/views/Execl/ExcelType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const fetchExcel = createAsyncThunk("execl/fetchExeclData", async () => {
  const response = await fetch("/easymock/execl-mock");
  const data = await response.json();
  return data.execl_mock;
});

type status = "idle" | "loading" | "succeeded" | "failed";

interface execlState {
  excel_mock: excelDataType[];
  status: status;
  error: string | undefined;
}
const initialState: execlState = {
  excel_mock: [],
  status: "idle",
  error: undefined,
};

export const excelSlice = createSlice({
  name: "excel",
  initialState,
  reducers: {},
  // 设计模式--组合模式
  extraReducers(builder) {
    builder
      .addCase(fetchExcel.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchExcel.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.excel_mock = action.payload;
        console.log(state.excel_mock);
      })
      .addCase(fetchExcel.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectExeclMockData = (state: RootState) => state.excel.excel_mock;

export const selectFetchError = (state: RootState) => state.excel.error;
export default excelSlice.reducer;
