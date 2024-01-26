import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation, useMatches } from "react-router-dom";
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from "antd/es/breadcrumb/Breadcrumb";

const RouteBreadcrumb: React.FC = () => {
  const matches = useMatches();
  const matchIds = matches.map((item) => ({
    title: item.id,
    path: item.pathname,
  }));

  const location = useLocation();

  const itemRender = (
    route: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>,
  ) => {
    if (route.path === location.pathname) {
      return <span>{route.title}</span>;
    }
    return <Link to={route.path as string}>{route.title}</Link>;
  };

  return (
    <Breadcrumb
      items={matchIds}
      itemRender={(route) => itemRender(route)}
    />
  );
};

export default RouteBreadcrumb;
