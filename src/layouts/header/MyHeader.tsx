import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import CustomizedBreadcrumb from "./Breadcrumb";
import { Header } from "antd/es/layout/layout";

interface MyHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}
const MyHeader = ({ collapsed, setCollapsed }: MyHeaderProps) => {
  return (
    <Header className="bg-white flex items-center px-4 gap-4">
      <div onClick={() => setCollapsed(!collapsed)} className="cursor-pointer">
        {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
      </div>
      <CustomizedBreadcrumb />
    </Header>
  );
};

export default MyHeader;
