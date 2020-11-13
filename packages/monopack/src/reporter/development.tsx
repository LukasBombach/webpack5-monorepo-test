import type { Compiler } from "webpack";
import type { Reporter } from "../reporter";
import type { Options } from "../options";
import type { Events } from "../config";

export async function getDevelopmentReporter(
  compiler: Compiler,
  events: Events,
  options: Options
): Promise<Reporter> {}
