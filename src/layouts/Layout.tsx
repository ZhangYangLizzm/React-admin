import { Layout, Spin } from "antd";
import { Content } from "antd/es/layout/layout";
import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import MyHeader from "./header/MyHeader";
import MySider from "./sider/MySider";

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
          <div className="bg-white p-4 rounded-xl h-full ">
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
