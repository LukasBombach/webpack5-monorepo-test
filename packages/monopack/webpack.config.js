const { resolve } = require("path");
const { BannerPlugin } = require("webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/index.tsx",
  target: "node",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  output: {
    filename: "index.js",
    path: resolve(__dirname, "dist"),
  },
  plugins: [new BannerPlugin({ banner: "#!/usr/bin/env node", raw: true })],
  optimization: {
    minimize: false,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
};
