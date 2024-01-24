import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import ExcelDownload from "./ExcelDownload";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchExcel,
  selectExeclMockData,
  selectFetchError,
} from "@/store/excel";
import { RootState } from "@/store/store";
import ExeclTable from "./ExcelTable";
import { ExcelDataStruct } from "./excelType";
import { SuspenseStatus } from "@/constants/status";

const ExeclExport: React.FC = () => {
  const dispatch = useAppDispatch();
  const execlStatus = useAppSelector((state: RootState) => state.excel.status);
  const tabelData = useAppSelector(selectExeclMockData);
  const [selectedRows, setSelectRows] = useState<ExcelDataStruct[]>([]);

  useEffect(() => {
    if (execlStatus === SuspenseStatus.Idle) {
      dispatch(fetchExcel());
    }
  }, [execlStatus, dispatch]);

  if (execlStatus === SuspenseStatus.Loading) {
    return <Spin />;
  } else if (execlStatus === SuspenseStatus.Failed) {
    const error = useAppSelector(selectFetchError);
    return <h1>{error}</h1>;
  } else {
    return (
      <>
        <ExcelDownload
          dataSource={tabelData}
          selectedRows={selectedRows}
        />
        <ExeclTable
          dataSource={tabelData}
          setSelectRows={setSelectRows}
        />
      </>
    );
  }
};

export default ExeclExport;
