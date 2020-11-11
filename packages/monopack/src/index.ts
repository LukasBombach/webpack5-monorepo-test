import { resolve } from "path";
import fs from "fs";
import webpack from "webpack";
import TSConfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const monopack = (...paths: string[]) => resolve(__dirname, ...paths);

const project = (...paths: string[]) => resolve(process.cwd(), ...paths);
const src = (...paths: string[]) => project("src", ...paths);
const dist = (...paths: string[]) => project("dist", ...paths);

const pkg = JSON.parse(fs.readFileSync(project("package.json"), "utf-8"));

console.log("Using project path", [project()]);

console.log(
  "externals",
  Object.fromEntries(
    Object.keys({
      ...pkg.devDependencies,
      ...pkg.peerDependencies,
    }).map(name => [name, true])
  )
);

const compiler = webpack({
  entry: src("index.ts"),
  mode: "production",
  output: {
    filename: "index.js",
    path: dist(),
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
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom",
    },
  },
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
