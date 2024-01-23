import { Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import ColumnGroup from "antd/es/table/ColumnGroup";
import { TableRowSelection } from "antd/es/table/interface";
import { excelDataType } from "./ExcelType";

interface ExeclTableProps {
  dataSource: excelDataType[];
  setSelectRows: React.Dispatch<React.SetStateAction<excelDataType[]>>;
}
const ExeclTable = ({ dataSource, setSelectRows }: ExeclTableProps) => {
  const rowSelection: TableRowSelection<excelDataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectRows(selectedRows);
    },
  };
  return (
    <>
      <Table dataSource={dataSource} bordered rowSelection={rowSelection}>
        <Column title="Id" dataIndex="id" key="id" />
        <ColumnGroup title="Main Information">
          <Column title="Title" dataIndex="title" key="title" />
          <Column
            title="Author"
            dataIndex="author"
            key="author"
            render={(author: string) => <Tag color="blue">{author}</Tag>}
          />
          <Column title="Readings" dataIndex="readings" key="readings" />
        </ColumnGroup>
        <Column title="Date" dataIndex="date" key="date" />
      </Table>
    </>
  );
};

export default ExeclTable;
