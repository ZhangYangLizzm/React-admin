import ReactDOM from "react-dom/client";
import "@/styles/global.less";
import App from "./App";
import Provider from "./provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  // </React.StrictMode>,
);
