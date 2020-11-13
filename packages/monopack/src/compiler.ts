import webpack from "webpack";
import type { Compiler, Configuration } from "webpack";

export async function getWebpackCompiler(
  config: Configuration
): Promise<Compiler> {
  return webpack(config);
}
