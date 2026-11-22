import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    react(),
    {
      enforce: "pre",
      ...mdx({
        providerImportSource: "@mdx-js/react",
      }),
    },
  ],
  test: {
    environment: "jsdom",
    include: ["tests/**/*.test.{ts,tsx}"],
    setupFiles: ["./tests/setup.ts"],
    env: {
      POSTGRES_PRISMA_URL: "postgres://vitest:vitest@127.0.0.1:5432/vitest",
    },
  },
});
