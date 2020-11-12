import { promises as fs } from "fs";
import nodeExternals from "webpack-node-externals";

import { monopack, src, dist, project } from "./paths";

import type { Configuration } from "webpack";

export async function getWebpackConfig(
  plugins: Configuration["plugins"] = []
): Promise<Configuration> {
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
          include: src(),
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
    },
    resolveLoader: {
      modules: ["node_modules", monopack("node_modules")],
      extensions: [".js", ".json"],
      mainFields: ["loader", "main"],
    },
    optimization: {
      minimize: false,
      usedExports: true,
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
    },
    externals: { ...nodeExternals(), ...(await getExternals()) },
    plugins: [...plugins],
  };
}

async function getExternals(): Promise<Record<string, true>> {
  const packageJSON = await fs.readFile(project("package.json"), "utf-8");
  const { peerDependencies } = JSON.parse(packageJSON);
  return Object.fromEntries(
    Object.keys({
      ...peerDependencies,
    }).map(name => [name, true])
  );
}
