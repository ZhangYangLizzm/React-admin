import { Layout, Spin } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import CustomizedMenu from "./sider/Menu";
import reactIcon from "@/assets/react.svg";
import MyHeader from "./header/MyHeader";
import MySider from "./sider/MySider";

//侧边栏Logo容器
const SiderbarLogoContainer = () => {
  return (
    <div className="sidebar-logo-container">
      <a
        href="#"
        className="sidebar-logo-link"
      >
        <img
          src={reactIcon}
          alt="reactIcon"
          className="sidebar-logo"
        />
        <h1 className="sidebar-title">React18</h1>
      </a>
    </div>
  );
};

const NewLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className="h-full overflow-hidden">
      <MySider collapsed={collapsed} />
      <Layout className="site-layout">
        <MyHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <Content className="p-4">
          <div className="bg-white p-4 rounded-xl h-full flex items-center justify-center">
            <Suspense fallback={<Spin size="large"/>}>
              <Outlet />
            </Suspense>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default NewLayout;
