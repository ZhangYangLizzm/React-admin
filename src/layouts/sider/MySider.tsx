import Sider from "antd/es/layout/Sider";
import CustomizedMenu from "./Menu";
import SiderLogo from "./Logo";

interface MySiderProps {
  collapsed: boolean;
}

const MySider = ({ collapsed }: MySiderProps) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme="light"
    >
      {/* //侧边栏Logo容器 */}
      <SiderLogo collapsed={collapsed} />
      {/* 菜单栏 */}
      <CustomizedMenu />
    </Sider>
  );
};

export default MySider;
