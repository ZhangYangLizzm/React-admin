import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { join } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
    },
    // extensions:[".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"]
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/baiduApi": {
        target: "https://aip.baidubce.com",
        rewrite: (path) => path.replace(/^\/baiduApi/, ""),
        changeOrigin: true,
      },
      "/easymock": {
        target:
          "https://mock.presstime.cn/mock/63eba97f27af6a4887b07c2b/react-admin",
        rewrite: (path) => path.replace(/^\/easymock/, ""),
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "ui-libs": ["antd"],
        },
      },
    },
  },
});
