import mdx from '@mdx-js/rollup'
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
      }),
    },
  ],
});
