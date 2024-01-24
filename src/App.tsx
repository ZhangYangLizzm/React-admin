import React from "react";
import { RouterProvider } from "react-router-dom";
import { message, Spin } from "antd";

import router from "./router/router";

const App: React.FC = () => {
  const [messageApi, messageContextHolder] = message.useMessage();

  return (
    <>
      {messageContextHolder}
      <RouterProvider
        router={router}
        fallbackElement={<Spin />}
      />
    </>
  );
};

export default App;
