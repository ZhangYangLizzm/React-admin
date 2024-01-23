import { createBrowserRouter, Outlet } from "react-router-dom";
import { lazy } from "react";

import DashBoard from "../views/DashBoard";
import NotFoundPage from "../views/404page/404page";

import Layout from "@/layouts";
import ExeclImport from "@/views/Execl/ExeclImport";
import ChartsLayout from "@/views/Charts/ChartsLayout";

const BarChart = lazy(() => import("../views/Charts/BarChart"));
const PieChart = lazy(() => import("../views/Charts/PieChart"));
const ScatterChart = lazy(() => import("../views/Charts/ScatterChart"));
const ClipBoard = lazy(() => import("../views/ClipBoard/ClipBoard"));
const ExeclExport = lazy(() => import("@/views/Execl/ExcelExport"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    id: "Layout",
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: "/dashboard",
        id: "Dashboard",
        element: <DashBoard />,
      },
      {
        path: "charts",
        id: "Charts",
        element: <Outlet />,
        children: [
          {
            path: "bar-chart",
            id: "BarChart",
            element: <BarChart />,
          },
          {
            path: "pie-chart",
            id: "PieChart",
            element: <PieChart />,
          },
          {
            path: "line-chart",
            id: "ScatterChart",
            element: <ScatterChart />,
          },
        ],
      },
      {
        path: "clipboard",
        id: "ClipBoard",
        element: <ClipBoard />,
      },
      {
        path: "excel",
        id: "Execl",
        element: <Outlet />,
        children: [
          {
            path: "export",
            id: "ExeclExport",
            element: <ExeclExport />,
          },
          {
            path: "import",
            id: "ExeclImport",
            element: <ExeclImport />,
          },
        ],
      },
      {
        path: "*",
        id: "NotFound",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
