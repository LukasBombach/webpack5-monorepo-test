import { getDevelopmentReporter } from "./reporter/development";

import type { Compiler } from "webpack";
import type { Options } from "./options";

export interface Reporter {
  runCompilation: () => Promise<void>;
}

export async function getReporter(
  compiler: Compiler,
  options: Options
): Promise<Reporter> {
  return await getDevelopmentReporter(compiler, options);
}
