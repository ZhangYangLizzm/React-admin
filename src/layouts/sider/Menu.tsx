import React from "react";
import { Menu, MenuProps } from "antd";
import {
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  CopyOutlined,
  FrownOutlined,
  FileExcelOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Link, useMatches } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <Link to="dashboard">Dashboard</Link>,
    "Dashboard",
    <DashboardOutlined />,
  ),
  getItem("图表", "Charts", <BarChartOutlined />, [
    getItem(
      <Link to="charts/bar-chart">柱状图</Link>,
      "BarChart",
      <BarChartOutlined />,
    ),
    getItem(
      <Link to="charts/pie-chart">饼状图</Link>,
      "PieChart",
      <PieChartOutlined />,
    ),
    getItem(
      <Link to="charts/scatter-chart">散点图</Link>,
      "ScatterChart",
      <LineChartOutlined />,
    ),
  ]),
  getItem("Excel", "Excel", <FileExcelOutlined />, [
    getItem(<Link to="excel/export">导出Excel</Link>, "ExcelExport"),
    getItem(<Link to="excel/import">导入Excel</Link>, "ExcelImport"),
  ]),
  getItem(<Link to="clipboard">剪贴板</Link>, "ClipBoard", <CopyOutlined />),
  getItem(
    <Link to="not-found">404 Not Found</Link>,
    "NotFound",
    <FrownOutlined />,
  ),
];

const CustomizedMenu: React.FC = () => {
  const matches = useMatches();
  const selectedKeys = matches.map((item) => item.id);
  return (
    <Menu
      selectedKeys={selectedKeys}
      mode="inline"
      items={items}
    />
  );
};

export default CustomizedMenu;
