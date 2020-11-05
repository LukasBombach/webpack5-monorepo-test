const { resolve } = require("path");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts"],
    fallback: { path: require.resolve("path-browserify") },
  },
  output: {
    filename: "index.js",
    path: resolve(__dirname, "dist"),
  },
};
