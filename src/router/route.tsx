import Layout from "@/layouts/Layout";
import Login from "@/views/login/Login";
import { MenuRouteConfig } from "@/config/menuRouteConfig";
import { generateMenuRoutes } from "@/utils/generateUtil";

const routes = [
  {
    path: "/login",
    element: <Login />,
    id: "Login",
  },
  {
    path: "/",
    element: <Layout />,
    id: "Layout",
    children: generateMenuRoutes(MenuRouteConfig),
  },
];

export default routes;
