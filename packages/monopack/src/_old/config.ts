import nodeExternals from "webpack-node-externals";
import { monopack } from "./monopack";
import { project } from "./project";

import type { Configuration } from "webpack";

export async function getWebpackConfig(
  plugins: Configuration["plugins"] = []
): Promise<Configuration> {
  return {
    entry: project.resolve("src/index.ts"),
    mode: "production",
    output: {
      filename: "index.js",
      path: project.resolve("dist"),
      libraryTarget: "commonjs2",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: project.resolve("src"),
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
      modules: ["node_modules", monopack.resolve("node_modules")],
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
  const { peerDependencies } = await project.getPackageJson();
  return Object.fromEntries(Object.keys(peerDependencies).map(n => [n, true]));
}
