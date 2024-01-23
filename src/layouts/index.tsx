import { theme, Layout, Spin } from "antd";
import { Header, Content, Footer } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import CustomizedBreadcrumb from "./Breadcrumb";
import CustomizedMenu from "./Menu";
import reactIcon from "@/assets/react.svg";

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
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
        theme="light"
      >
        {/* //侧边栏Logo容器 */}
        <SiderbarLogoContainer />
        {/* 菜单栏 */}
        <CustomizedMenu />
      </Sider>
      <Layout className="site-layout">
        <Header className="bg-white flex items-center">
          <CustomizedBreadcrumb />
        </Header>
        <Content className="p-4">
          <div className="bg-white p-4 rounded-xl h-full">
            <Suspense fallback={<Spin />}>
              <Outlet />
            </Suspense>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default NewLayout;
