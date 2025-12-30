import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  base: "/", // ✅ REQUIRED for root-domain deployment on Vercel

  server: {
    host: "::",
    port: 8080,
    strictPort: false,
    proxy: {
      "/api": {
        target: "https://api.prosmart.in", // ✅ use API domain, not frontend
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path,
      },
    },
  },

  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
