const { resolve } = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: {
    library: ["react", "ink"],
  },
  target: "node",
  externals: [nodeExternals()],
  context: __dirname,
  resolve: {
    extensions: [".js"],
    modules: [__dirname, "node_modules"],
  },
  output: {
    filename: "[name].dll.js",
    path: resolve(__dirname, "dist/library"),
    library: "[name]",
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]",
      path: resolve(__dirname, "dist/library/[name].json"),
    }),
  ],
  optimization: {
    minimize: false,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
};
