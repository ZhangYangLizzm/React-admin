import store from "@/store/store";
import { Provider as ReduxProvider } from "react-redux";
import { ConfigProvider } from "antd";

// #TODO 自定義主題色
const antdProviderData = {
  token: {
    colorPrimary: "#1677ff",
  },
};

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <ConfigProvider theme={antdProviderData}>{children}</ConfigProvider>
    </ReduxProvider>
  );
};

export default Provider;
