const { resolve } = require("path");
const { BannerPlugin, DllReferencePlugin } = require("webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/index.tsx",
  target: "node",
  externals: [nodeExternals()],
  context: __dirname,
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
    modules: [__dirname, "node_modules"],
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
