import React from "react";
import { Menu } from "antd";

import { useMatches } from "react-router-dom";
import { MenuRouteConfig } from "@/config/menuRouteConfig";
import { generateMenuItems } from "@/utils/generateUtil";

const CustomizedMenu: React.FC = () => {
  const matches = useMatches();
  const selectedKeys = matches.map((item) => item.id);
  const MenuItems = generateMenuItems(MenuRouteConfig);

  return (
    <Menu
      selectedKeys={selectedKeys}
      mode="inline"
      items={MenuItems}
    />
  );
};

export default CustomizedMenu;
