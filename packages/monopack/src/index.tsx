import { getOptions } from "./options";
import { getWebpackConfig } from "./config";
import { getWebpackCompiler } from "./compiler";
import { getReporter } from "./reporter";

async function main() {
  const options = await getOptions();
  const { config, events } = await getWebpackConfig(options);
  const compiler = await getWebpackCompiler(config);
  const reporter = await getReporter(compiler, events, options);
  await reporter.runCompilation();
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
