import webpack from "webpack";

import type { Configuration, Stats } from "webpack";

export type Compiler = ReturnType<typeof getCompiler> extends Promise<infer T>
  ? T
  : never;

export async function getCompiler(config: Configuration) {
  const compiler = webpack(config, () => {});

  const run = () =>
    new Promise<Stats>((resolve, reject) => {
      compiler.run((error, stats) => (error ? reject(error) : resolve(stats)));
    });

  const isRunning = () => compiler.running;

  return { run, isRunning };
}
