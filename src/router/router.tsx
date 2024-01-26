import { createBrowserRouter } from "react-router-dom";

import routes from "./route";

const router = createBrowserRouter(routes, {
  basename: "/",
});

export default router;
