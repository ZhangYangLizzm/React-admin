import { ExcelDataStruct } from "@/views/excel/excelType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { SuspenseStatus } from "@/constants/status";
interface ExcelState {
  excel_mock: ExcelDataStruct[];
  status: SuspenseStatus;
  error: string | undefined;
}

export const fetchExcel = createAsyncThunk("excel/fetchExcelData", async () => {
  const response = await fetch("/easymock/excel-mock");
  const data = await response.json();
  return data.excel_mock;
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

export const selectExcelMockData = (state: RootState) => state.excel.excel_mock;

export const selectFetchError = (state: RootState) => state.excel.error;

export default excelSlice.reducer;
