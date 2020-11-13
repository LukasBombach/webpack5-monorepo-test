import { resolve } from "path";

import type { Configuration } from "webpack";
import type { Options } from "./options";

const root = (...paths: string[]) => resolve(__dirname, "..", ...paths);
const cwd = (...paths: string[]) => resolve(process.cwd(), ...paths);

export async function getWebpackConfig(
  options: Options
): Promise<Configuration> {
  return {
    entry: cwd("src/index.ts"),
    mode: "development",
    output: {
      filename: "index.js",
      path: cwd("dist"),
      libraryTarget: "commonjs2",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    resolveLoader: {
      modules: ["node_modules", root("node_modules")],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: cwd("src"),
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      ],
    },
    optimization: {
      minimize: false,
      usedExports: true,
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
    },
  };
}
