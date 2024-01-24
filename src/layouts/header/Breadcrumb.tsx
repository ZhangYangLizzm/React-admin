import React from "react";
import { Breadcrumb } from "antd";
import { useMatches } from "react-router-dom";

const CustomizedBreadcrumb: React.FC = () => {
  const matches = useMatches();
  const matchIds = matches.map(item => ({ title: item.id }));
  return <Breadcrumb items={matchIds} />;
};

export default CustomizedBreadcrumb;
