// #!/usr/bin/env node

import { resolve } from "path";

/* import { resolve } from "path";
import getBaseWebpackConfig from "next/dist/build/webpack-config";

const src = (path = "") => resolve(process.cwd(), "src", path);
const dist = (path = "") => resolve(process.cwd(), "dist", path);
const app = (path = "") => resolve(process.cwd(), "../app", path);

getBaseWebpackConfig(process.cwd(), {
  buildId: "fakebuildid",
  config: {
    experimental: {},
    distDir: dist(),
    pageExtensions: [],
    env: {},
    devIndicators: {},
    images: {},
    i18n: {},
    future: {},
    sassOptions: {},
  },
  pagesDir: app("pages"),
  entrypoints: { index: src("index.ts") },
  rewrites: [],
})
  .then(config => console.log(config))
  .catch(error => console.error(error)); */

console.log("hello world", resolve(process.cwd()));
