import { promises as fs } from "fs";

import TSConfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { monopack, src, dist, project } from "./paths";

import type { Configuration } from "webpack";

export async function getWebpackConfig(): Promise<Configuration> {
  return {
    entry: src("index.ts"),
    mode: "production",
    output: {
      filename: "index.js",
      path: dist(),
      libraryTarget: "commonjs2",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
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
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      plugins: [
        new TSConfigPathsPlugin({
          configFile: monopack("tsconfig.json"),
        }),
      ],
    },
    resolveLoader: {
      modules: ["node_modules", monopack("node_modules")],
      extensions: [".js", ".json"],
      mainFields: ["loader", "main"],
    },
    externals: await getExternals(),
  };
}

async function getExternals(): Promise<Configuration["externals"]> {
  const packageJSON = await fs.readFile(project("package.json"), "utf-8");
  const { peerDependencies } = JSON.parse(packageJSON);
  return Object.fromEntries(
    Object.keys({
      ...peerDependencies,
    }).map(name => [name, true])
  );
}
