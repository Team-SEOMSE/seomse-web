import svgr from "@svgr/rollup";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    svgr(),
    react(),
    checker({
      typescript: true,
    }),
  ],
});
