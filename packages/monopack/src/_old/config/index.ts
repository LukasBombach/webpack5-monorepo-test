import nodeExternals from "webpack-node-externals";
import {
  project,
  isDev,
  getMonopackModules,
  getFastBuild,
  getPlugins,
  getSmallBundle,
} from "./util";

export const config = {
  entry: project.getEntry(),
  mode: project.getMode(),
  output: {
    filename: project.getOutputFileName(),
    path: project.getOutputPath(),
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: project.getSrcPath(),
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
    modules: ["node_modules", getMonopackModules()],
    extensions: [".js", ".json"],
    mainFields: ["loader", "main"],
  },
  optimization: isDev() ? getFastBuild() : getSmallBundle(),
  externals: { ...nodeExternals(), ...project.getPeerDepsAsExternals() },
  plugins: getPlugins(),
};
