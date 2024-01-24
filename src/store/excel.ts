import { ExcelDataStruct } from "@/views/execl/excelType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { SuspenseStatus } from "@/constants/status";
interface ExcelState {
  excel_mock: ExcelDataStruct[];
  status: SuspenseStatus;
  error: string | undefined;
}

export const fetchExcel = createAsyncThunk("execl/fetchExeclData", async () => {
  const response = await fetch("/easymock/execl-mock");
  const data = await response.json();
  return data.execl_mock;
});

const initialState: ExcelState = {
  excel_mock: [],
  status: SuspenseStatus.Idle,
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
        state.status = SuspenseStatus.Loading;
      })
      .addCase(fetchExcel.fulfilled, (state, action) => {
        state.status = SuspenseStatus.Succeeded;
        state.excel_mock = action.payload;
      })
      .addCase(fetchExcel.rejected, (state, action) => {
        state.status = SuspenseStatus.Failed;
        state.error = action.error.message;
      });
  },
});

export const selectExeclMockData = (state: RootState) => state.excel.excel_mock;

export const selectFetchError = (state: RootState) => state.excel.error;

export default excelSlice.reducer;
