import { message, Upload, UploadProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Excel from "exceljs";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { xlsxToArrayBuffer } from "@/utils/FormatConverter";
import { useState } from "react";
import ExeclTable from "./ExeclTable";
import { excelDataType } from "./ExcelType";
import { Headers } from "./ExcelType";
const { Dragger } = Upload;

const DraggerPropsFC = (
  setTabelData: React.Dispatch<React.SetStateAction<excelDataType[]>>,
) => {
  return {
    height: 200,
    multiple: false,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    beforeUpload: async (file: RcFile) => {
      const fileType = file.name.split(".").at(-1);
      if (fileType === "xlsx") {
        const buffer = await xlsxToArrayBuffer(file);
        const workbook = new Excel.Workbook();
        await workbook.xlsx.load(buffer);
        const worksheet = workbook.getWorksheet(1);
        let tempArr: any[] = [];
        worksheet?.getSheetValues().forEach((value, index) => {
          if (index > 1) {
            (value as string[]).shift();
            let tempObj: any = {};
            (value as string[]).forEach((item, index2) => {
              tempObj[Headers[index2]] = item;
            });
            tempObj["key"] = index - 1;
            tempArr.push(tempObj);
          }
        });
        setTabelData(tempArr);
      } else {
        message.error("only support xlsx");
      }
    },
    onchange: (info: UploadChangeParam<UploadFile<any>>) => {
      console.log(info);
    },
  };
};
const ExcelImport = () => {
  const [tabelData, setTabelData] = useState<excelDataType[]>([]);
  const [selectedRows, setSelectRows] = useState<excelDataType[]>([]);
  const DraggerProps = DraggerPropsFC(setTabelData);
  return (
    <>
      <Dragger {...DraggerProps} style={{ marginBottom: "16px" }}>
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
      <ExeclTable dataSource={tabelData} setSelectRows={setSelectRows} />
    </>
  );
};

export default ExcelImport;
