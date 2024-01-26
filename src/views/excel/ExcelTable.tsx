import { Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import ColumnGroup from "antd/es/table/ColumnGroup";
import { TableRowSelection } from "antd/es/table/interface";
import { ExcelDataStruct } from "./excelType";

interface ExcelTableProps {
  dataSource: ExcelDataStruct[];
  setSelectRows: React.Dispatch<React.SetStateAction<ExcelDataStruct[]>>;
}
const ExcelTable = ({ dataSource, setSelectRows }: ExcelTableProps) => {
  const rowSelection: TableRowSelection<ExcelDataStruct> = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectRows(selectedRows);
    },
  };
  return (
    <Table
      dataSource={dataSource}
      bordered
      rowSelection={rowSelection}
      rowKey="id"
    >
      <Column
        title="Id"
        dataIndex="id"
        key="id"
      />
      <ColumnGroup title="Main Information">
        <Column
          title="Title"
          dataIndex="title"
          key="title"
        />
        <Column
          title="Author"
          dataIndex="author"
          key="author"
          render={(author: string) => <Tag color="blue">{author}</Tag>}
        />
        <Column
          title="Readings"
          dataIndex="readings"
          key="readings"
        />
      </ColumnGroup>
      <Column
        title="Date"
        dataIndex="date"
        key="date"
      />
    </Table>
  );
};

export default ExcelTable;
