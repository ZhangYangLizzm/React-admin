import {
  DashboardOutlined,
  BarChartOutlined,
  PieChartOutlined,
  DotChartOutlined,
  FileExcelOutlined,
  ImportOutlined,
  ExportOutlined,
  PaperClipOutlined,
  FrownOutlined,
} from "@ant-design/icons";
import { lazy } from "react";
import { Link, Outlet } from "react-router-dom";

const DashBoard = lazy(() => import("@/views/dashBoard/Dashboard"));

const BarChart = lazy(() => import("@/views/charts/BarChart"));
const PieChart = lazy(() => import("@/views/charts/PieChart"));
const DotChart = lazy(() => import("@/views/charts/DotChart"));

const ClipBoard = lazy(() => import("@/views/clipBoard/ClipBoard"));

const ExeclExport = lazy(() => import("@/views/execl/ExcelExport"));
const ExeclImport = lazy(() => import("@/views/execl/ExcelImport"));

const NotFoundPage = lazy(() => import("@/views/404page/404page"));

export interface MenuRouteConfigStruct {
  type: "link" | "menuGroup";
  path: string;
  label: string;
  key: string;
  element: JSX.Element;
  icon?: React.ReactNode;
  children?: MenuRouteConfigStruct[];
}

export const MenuRouteConfig: MenuRouteConfigStruct[] = [
  {
    type: "link",
    path: "dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
    key: "Dashbard",
    element: <DashBoard />,
  },
  {
    type: "menuGroup",
    path: "charts",
    key: "Charts",
    label: "图表",
    icon: <BarChartOutlined />,
    element: <Outlet />,
    children: [
      {
        type: "link",
        path: "bar-chart",
        label: "柱状图",
        key: "BarChart",
        icon: <BarChartOutlined />,
        element: <BarChart />,
      },
      {
        type: "link",
        path: "pie-chart",
        label: "饼状图",
        key: "PieChart",
        icon: <PieChartOutlined />,
        element: <PieChart />,
      },
      {
        type: "link",
        path: "scatter-chart",
        label: "散点图",
        key: "DotChart",
        icon: <DotChartOutlined />,
        element: <DotChart />,
      },
    ],
  },
  {
    type: "menuGroup",
    path: "excel",
    key: "Excel",
    label: "Excel",
    icon: <FileExcelOutlined />,
    element: <Outlet />,
    children: [
      {
        type: "link",
        path: "import",
        label: "Excel导入",
        key: "ExcelImport",
        icon: <ImportOutlined />,
        element: <ExeclImport />,
      },
      {
        type: "link",
        path: "export",
        label: "Excel导出",
        key: "ExcelExport",
        icon: <ExportOutlined />,
        element: <ExeclExport />,
      },
    ],
  },
  {
    type: "link",
    path: "clipboard",
    icon: <PaperClipOutlined />,
    label: "剪贴板",
    key: "Clipborad",
    element: <ClipBoard />,
  },
  {
    type: "link",
    path: "404",
    icon: <FrownOutlined />,
    label: "404",
    key: "NotFound",
    element: <NotFoundPage />,
  },
];
