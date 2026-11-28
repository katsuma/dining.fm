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
  ssr: {
    // sanitize-html is CommonJS and require()s the ESM-only htmlparser2.
    // Vercel's Node.js runtime does not support require() of ES modules
    // (ERR_REQUIRE_ESM even on Node 24), so bundle this dependency chain
    // into the server build instead of loading it from node_modules.
    // Its CommonJS dependencies are bundled too: Vercel's file tracing does
    // not follow the require() calls left in the bundled output.
    noExternal: [
      "sanitize-html",
      "htmlparser2",
      "domhandler",
      "domutils",
      "dom-serializer",
      "domelementtype",
      "entities",
      "escape-string-regexp",
      "is-plain-object",
      "parse-srcset",
      "postcss",
      "nanoid",
      "picocolors",
      "source-map-js",
      "launder",
      "dayjs",
    ],
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
