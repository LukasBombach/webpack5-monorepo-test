import { getDevelopmentReporter } from "./reporter/development";
import { getProductionReporter } from "./reporter/production";

import type { Compiler } from "webpack";
import type { Options } from "./options";
import type { Events } from "./config";

export interface Reporter {
  runCompilation: () => Promise<void>;
}

export async function getReporter(
  compiler: Compiler,
  events: Events,
  options: Options
): Promise<Reporter> {
  return await getProductionReporter(compiler, events, options);
  // return await getDevelopmentReporter(compiler, events, options);
}
