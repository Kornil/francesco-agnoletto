import { defineConfig } from "vite";
import path, { resolve } from "path";
import fs from "fs";
import injectHTML from "vite-plugin-html-inject";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        error: resolve(__dirname, "error.html"),
      },
    },
  },
  plugins: [injectHTML()],
});
