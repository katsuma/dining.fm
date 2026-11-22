import mdx from "@mdx-js/rollup";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    host: true,
  },
  plugins: [
    tailwindcss(),
    reactRouter(),
    {
      enforce: "pre",
      ...mdx({
        providerImportSource: "@mdx-js/react",
      }),
    },
  ],
});
