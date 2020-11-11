import webpack from "webpack";
import { getWebpackConfig } from "./webpackConfig";

import type { Stats } from "webpack";

export async function getCompiler() {
  const config = await getWebpackConfig();
  const compiler = webpack(config);
  const run = () =>
    new Promise<Stats>((resolve, reject) => {
      compiler.run((error, stats) => (error ? reject(error) : resolve(stats)));
    });

  return { run };
}
