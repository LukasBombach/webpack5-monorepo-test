import type { Reporter } from "../reporter";
import type { Compiler } from "webpack";
import type { Options } from "../options";
import type { Events } from "../config";

export async function getProductionReporter(
  compiler: Compiler,
  events: Events,
  options: Options
): Promise<Reporter> {
  return {
    runCompilation: async () => {
      const start = process.hrtime.bigint();
      console.log("Starting compilation");
      compiler.run(() => {
        const execTime = process.hrtime.bigint() - start;
        const execTimeInSeconds =
          parseInt((execTime / 10000000n).toString()) / 100;
        console.log(`Compiled in ${execTimeInSeconds}s`);
      });
    },
  };
}
