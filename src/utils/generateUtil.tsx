import { MenuRouteConfigStruct } from "@/config/menuRouteConfig";
import { Link } from "react-router-dom";

export const generateMenuItems: any = (
  routes: MenuRouteConfigStruct[],
  parentPath?: string,
) => {
  return routes.map((item) => {
    if (item.type === "menuGroup") {
      return {
        ...item,
        children: generateMenuItems(item.children!, item.path),
      };
    } else {
      return {
        ...item,
        label: (
          <Link to={parentPath ? parentPath + "/" + item.path : item.path}>
            {item.label}
          </Link>
        ),
      };
    }
  });
};

export const generateMenuRoutes: any = (routes: MenuRouteConfigStruct[]) => {
  return routes.map((item) => {
    if (item.type === "menuGroup") {
      return {
        ...item,
        id: item.key,
        children: generateMenuRoutes(item.children!),
      };
    }
    return {
      ...item,
      id: item.key,
    };
  });
};
