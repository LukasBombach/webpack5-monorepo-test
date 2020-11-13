import { getProductionReporter } from "./production";

import type { Reporter } from "../reporter";
import type { Compiler } from "webpack";
import type { Options } from "../options";
import type { Events } from "../config";

export async function getCiReporter(
  compiler: Compiler,
  events: Events,
  options: Options
): Promise<Reporter> {
  return await getProductionReporter(compiler, events, options);
}
