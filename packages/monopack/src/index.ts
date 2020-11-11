import { resolve } from "path";
import fs from "fs";
import webpack from "webpack";
import TSConfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const monopack = (...paths: string[]) => resolve(__dirname, ...paths);
const project = (...paths: string[]) => resolve(process.cwd(), ...paths);
const src = (...paths: string[]) => project("src", ...paths);
const dist = (...paths: string[]) => project("dist", ...paths);

const pkg = JSON.parse(fs.readFileSync(project("package.json"), "utf-8"));

const compiler = webpack({
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
        configFile: monopack("../tsconfig.json"),
      }),
    ],
  },
  resolveLoader: {
    modules: [resolve(__dirname, "../node_modules"), "node_modules"],
    extensions: [".js", ".json"],
    mainFields: ["loader", "main"],
  },
  externals: Object.fromEntries(
    Object.keys({
      ...pkg.peerDependencies,
    }).map(name => [name, true])
  ),
});

compiler.run((error, stats) => {
  if (error) {
    console.error(error);
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    info.errors.forEach(error => {
      console.error(error.message);
      console.error(error.details);
    });
  }

  if (stats.hasWarnings()) {
    info.warnings.forEach(warning => {
      console.warn(warning.message);
      console.warn(warning.details);
    });
  }

  console.log("done 🎉");
});
