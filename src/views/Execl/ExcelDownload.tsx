import { Button, Input, message, Space } from "antd";
import React, { useState } from "react";
import Execl from "exceljs";
import { execlDownloadClick } from "@/utils/Download";
import { columns, excelDataType } from "./ExcelType";
interface ExcelDownloadProps {
  dataSource: excelDataType[];
  selectedRows: excelDataType[];
}

const ExcelDownload = ({ dataSource, selectedRows }: ExcelDownloadProps) => {
  const [fileName, setFileName] = useState("execl-list");
  const [buttonLoading, setButtonLoading] = useState(false);

  const exportClick = (clickType: "all" | "selected" | "multiHeader") => {
    if (clickType === "selected" && !selectedRows.length) {
      return message.error("Please select at least one");
    }
    setButtonLoading(() => true);
    const workbook = new Execl.Workbook();
    workbook.creator = "zhangyangli";
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastModifiedBy = "admin";
    let worksheet = workbook.addWorksheet("worksheet");
    worksheet.columns = columns;
    if (clickType === "all") {
      worksheet.addRows(dataSource);
    } else if (clickType === "selected") {
      worksheet.addRows(selectedRows);
    } else if (clickType === "multiHeader") {
      worksheet.getRow(1).values = ["Id", "Main Information", "", "", "Date"];
      worksheet.getRow(2).values = ["", "title", "author", "readings", ""];
      worksheet.mergeCells(1, 2, 1, 4);
      worksheet.mergeCells("A1:A2");
      worksheet.mergeCells("E1:E2");
      worksheet.addRows(dataSource);
    }
    // 表格居中
    const columnCount = worksheet.actualColumnCount;
    for (let i = 1; i <= columnCount; i++) {
      worksheet.getColumn(i).alignment = {
        vertical: "middle",
        horizontal: "center",
      };
    }
    workbook.xlsx.writeBuffer().then((buffer) => {
      execlDownloadClick(buffer, fileName);
      setTimeout(() => {
        setButtonLoading(false);
      }, 1000);
    });
  };
  return (
    <Space align="start">
      <Input
        addonBefore="Filename:"
        style={{ marginBottom: 8, width: 200 }}
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      <Button
        type="primary"
        onClick={() => exportClick("all")}
        loading={buttonLoading}
      >
        Export All
      </Button>
      <Button
        type="primary"
        onClick={() => exportClick("selected")}
        loading={buttonLoading}
      >
        Export Selection
      </Button>
      <Button
        type="primary"
        onClick={() => exportClick("multiHeader")}
        loading={buttonLoading}
      >
        Export MultiHeader
      </Button>
    </Space>
  );
};

export default ExcelDownload;
