import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import ExeclDownload from "./ExcelDownload";
import { useAppDispatch } from "@/store/hooks";
import {
  fetchExcel,
  selectExeclMockData,
  selectFetchError,
} from "@/store/excel";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ExeclTable from "./ExeclTable";
import { excelDataType } from "./ExcelType";

const ExeclExport: React.FC = () => {
  const dispatch = useAppDispatch();
  const execlStatus = useSelector((state: RootState) => state.excel.status);
  const tabelData = useSelector(selectExeclMockData);
  const [selectedRows, setSelectRows] = useState<excelDataType[]>([]);

  useEffect(() => {
    if (execlStatus === "idle") {
      dispatch(fetchExcel());
    }
  }, [execlStatus, dispatch]);

  if (execlStatus === "loading") {
    return <Spin />;
  } else if (execlStatus === "failed") {
    const error = useSelector(selectFetchError);
    return <h1>{error}</h1>;
  } else {
    return (
      <>
        <ExeclDownload dataSource={tabelData} selectedRows={selectedRows} />
        <ExeclTable dataSource={tabelData} setSelectRows={setSelectRows} />
      </>
    );
  }
};

export default ExeclExport;
