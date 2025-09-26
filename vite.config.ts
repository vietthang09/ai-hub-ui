import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.77.89:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
