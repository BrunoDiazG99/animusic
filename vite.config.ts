import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: "/animusic",
    build: {
      sourcemap: true,
    },
    plugins: [
      TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: "haruchon.test",
      https: {
        key: fs.readFileSync(path.resolve(__dirname, env.VITE_CERT_KEY_PATH)),
        cert: fs.readFileSync(path.resolve(__dirname, env.VITE_CERT_PATH)),
      },
      port: 5173,
    },
  };
});
