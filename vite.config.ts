import { defineConfig } from "vite";
import path, { resolve } from "path";
import fs from "fs";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        error: resolve(__dirname, "error.html"),
      },
    },
  },
  plugins: [
    {
      name: "mock-api",
      configureServer(server) {
        server.middlewares.use("/data", (req, res, next) => {
          const file = req.url?.replace(/^\//, "");

          if (!file) {
            next();
            return;
          }

          const filePath = path.join(__dirname, "mocks", file);

          if (fs.existsSync(filePath)) {
            res.setHeader("Content-Type", "application/json");
            res.end(fs.readFileSync(filePath, "utf8"));
            return;
          }

          next();
        });
      },
    },
  ],
});
