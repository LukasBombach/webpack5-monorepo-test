/* import React from "react";
import { render } from "ink";
import { Cli } from "./cli";

render(<Cli />);
 */

import { getOptions } from "./args";
import { getWebpackConfig } from "./config";
import { getWebpackCompiler } from "./compiler";
import { getReporter } from "./reporter";

async function main() {
  const options = await getOptions();
  const config = await getWebpackConfig(options);
  const compiler = await getWebpackCompiler(config);
  const reporter = await getReporter(compiler);
  reporter.runCompilation();
}

main();
