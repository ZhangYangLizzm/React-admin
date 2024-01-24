import { createBrowserRouter, Outlet } from "react-router-dom";
import { lazy } from "react";

import Layout from "@/layouts/Layout";

const DashBoard = lazy(() => import("@/views/dashBoard/Dashboard"));

const BarChart = lazy(() => import("@/views/charts/BarChart"));
const PieChart = lazy(() => import("@/views/charts/PieChart"));
const ScatterChart = lazy(() => import("@/views/charts/ScatterChart"));

const ClipBoard = lazy(() => import("@/views/clipBoard/ClipBoard"));

const ExeclExport = lazy(() => import("@/views/execl/ExcelExport"));
const ExeclImport = lazy(() => import("@/views/execl/ExcelImport"));

const NotFoundPage = lazy(() => import("@/views/404page/404page"));

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
            path: "scatter-chart",
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
        id: "Excel",
        element: <Outlet />,
        children: [
          {
            path: "export",
            id: "ExcelExport",
            element: <ExeclExport />,
          },
          {
            path: "import",
            id: "ExcelImport",
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
