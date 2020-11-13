import { EventEmitter } from "events";
import { resolve } from "path";
import { ProgressPlugin } from "webpack";

import type { Configuration } from "webpack";
import type { Options } from "./options";

const root = (...paths: string[]) => resolve(__dirname, "..", ...paths);
const cwd = (...paths: string[]) => resolve(process.cwd(), ...paths);

export interface Events {
  emit: (name: "progress", percentage: number, message: string) => void;
  on: (
    name: "progress",
    listener: (percentage: number, message: string) => void
  ) => void;
  off: (
    name: "progress",
    listener: (percentage: number, message: string) => void
  ) => void;
}

export async function getWebpackConfig(
  options: Options
): Promise<{ config: Configuration; events: Events }> {
  const events = new EventEmitter() as Events;

  const config: Configuration = {
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
    plugins: [
      new ProgressPlugin((percentage, message) => {
        events.emit("progress", percentage, message);
      }),
    ],
  };

  return { config, events };
}
