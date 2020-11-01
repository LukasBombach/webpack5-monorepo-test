/* import loadConfig from "next-server/next-config";
import getBaseWebpackConfig from "next/dist/build/webpack-config";

const config = loadConfig(__dirname);

getBaseWebpackConfig(__dirname, {
  config,
  entrypoints: {},
}).then(webpackConfig => console.log("Config GET!", webpackConfig)); */

const message: string = "hello build";

console.log(message, process.cwd());
