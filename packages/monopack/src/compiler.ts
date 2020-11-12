import webpack from "webpack";

import type { Configuration, Stats } from "webpack";

type Unpromise<P extends Promise<any>> = P extends Promise<infer T> ? T : never;
export type Compiler = Unpromise<ReturnType<typeof getCompiler>>;

export async function getCompiler(config: Configuration) {
  const compiler = webpack(config, () => {});

  const run = (): Promise<Stats> =>
    new Promise((resolve, reject) => {
      compiler.run((error, stats) => (error ? reject(error) : resolve(stats)));
    });

  const isRunning = () => compiler.running;

  return { run, isRunning };
}
