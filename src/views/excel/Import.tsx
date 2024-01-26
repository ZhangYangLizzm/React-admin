import { message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { Workbook } from "exceljs";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { useState } from "react";
import ExcelTable from "./ExcelTable";
import { ExcelDataStruct } from "./excelType";
import { Headers } from "./excelType";
import { fileToArrayBuffer } from "@/utils/fileReaderUtil";
const { Dragger } = Upload;

const DraggerPropsFC = (
  setTabelData: React.Dispatch<React.SetStateAction<ExcelDataStruct[]>>,
) => {
  return {
    height: 200,
    multiple: false,
    beforeUpload: async (file: RcFile) => {
      const fileType = file.name.split(".").at(-1);
      if (fileType === "xlsx") {
        const buffer = await fileToArrayBuffer(file);
        const workbook = new Workbook();
        await workbook.xlsx.load(buffer);
        const worksheet = workbook.getWorksheet();

        const sheetData = worksheet
          ?.getSheetValues()
          ?.map((rowItem) => (rowItem as string[])?.filter((item) => !!item))
          .slice(1);

        if (sheetData?.length) {
          const sheetHeader = sheetData[0];
          const sheetContent = sheetData?.slice(1);
          let tempArr: any[] = [];
          sheetContent?.map((rowItem, rowIndex) => {
            let tempObj: Record<string, string | number> = {};
            (rowItem as string[]).map((rowValue, valueIndex) => {
              tempObj[sheetHeader[valueIndex]] = rowValue;
            });
            tempArr.push(tempObj);
          });
          setTabelData(tempArr);
        }
      } else {
        message.error("only support xlsx");
      }
    },
  };
};

const ExcelImport = () => {
  const [tabelData, setTabelData] = useState<ExcelDataStruct[]>([]);
  const [selectedRows, setSelectRows] = useState<ExcelDataStruct[]>([]);
  const DraggerProps = DraggerPropsFC(setTabelData);
  return (
    <div className="flex flex-col gap-4">
      <Dragger
        {...DraggerProps}
        showUploadList={false}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>

      <ExcelTable
        dataSource={tabelData}
        setSelectRows={setSelectRows}
      />
    </div>
  );
};

export default ExcelImport;
