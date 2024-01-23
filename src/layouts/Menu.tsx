import React from "react";
import { Menu, MenuProps } from "antd";
import {
  HomeOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
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
  getItem(<Link to="dashboard">首页</Link>, "Dashboard", <HomeOutlined />),
  getItem("图表", "Chart", <BarChartOutlined />, [
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
      <Link to="charts/line-chart">散点图</Link>,
      "ScatterChart",
      <LineChartOutlined />,
    ),
  ]),
  getItem(<Link to="clipboard">剪贴板</Link>, "ClipBoard"),
  // getItem(<Link to="excel">Execl</Link>, "Execl", "", [
  //   getItem(<Link to="excel/export">导出Excel</Link>, "ExcelExport"),
  //   getItem(<Link to="excel/import">导入Excel</Link>, "ExcelImport"),
  // ]),
  getItem(<Link to="not-found">404 Not Found</Link>, "NotFound"),
];

const CustomizedMenu: React.FC = () => {
  const matches = useMatches();
  const selectedKeys = matches.map(item => item.id);
  return (
    <Menu
      selectedKeys={selectedKeys}
      mode="inline"
      items={items}
    />
  );
};

export default CustomizedMenu;
