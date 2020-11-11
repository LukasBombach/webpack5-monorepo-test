import { getCompiler } from "./compiler";
import { getWebpackConfig } from "./config";

async function main() {
  try {
    const config = await getWebpackConfig();
    const compiler = await getCompiler(config);
    const stats = await compiler.run();
    const info = stats.toJson();

    if (stats.hasErrors()) {
      info.errors.forEach(error => {
        console.error(error.message);
        console.error(error.details);
      });
    }

    if (stats.hasWarnings()) {
      info.warnings.forEach(warning => {
        console.warn(warning.message);
        console.warn(warning.details);
      });
    }

    console.log("done 🎉");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
