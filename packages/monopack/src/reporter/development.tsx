import type { Compiler } from "webpack";
import type { Reporter } from "../reporter";
import type { Options } from "../options";

export async function getDevelopmentReporter(
  compiler: Compiler,
  options: Options
): Promise<Reporter> {}
