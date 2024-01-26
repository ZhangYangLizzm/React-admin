import reactIcon from "@/assets/react.svg";

//侧边栏Logo容器
const SiderLogo = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <div className="flex gap-2 justify-center items-center h-16">
      <img
        src={reactIcon}
        alt="Logo"
        className="w-6 h-6"
      />
      {!collapsed ? <h1 className="text-primary">React18</h1> : ""}
    </div>
  );
};

export default SiderLogo;
