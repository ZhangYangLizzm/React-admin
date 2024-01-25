import React from "react";
import { Breadcrumb } from "antd";
import { Link, useMatches } from "react-router-dom";

const RouteBreadcrumb: React.FC = () => {
  const matches = useMatches();
  const matchIds = matches.map((item) => ({
    title: item.id,
    path: item.pathname,
  }));
  
  return (
    <Breadcrumb
      items={matchIds}
      itemRender={(route) => {
        return <Link to={route.path as string}>{route.title}</Link>;
      }}
    />
  );
};

export default RouteBreadcrumb;
