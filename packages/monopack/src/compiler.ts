import webpack from "webpack";

import type { Configuration, Stats } from "webpack";

export async function getCompiler(config: Configuration) {
  const compiler = webpack(config);
  const run = () =>
    new Promise<Stats>((resolve, reject) => {
      compiler.run((error, stats) => (error ? reject(error) : resolve(stats)));
    });

  return { run };
}
