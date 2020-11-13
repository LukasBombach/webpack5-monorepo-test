import Config from "webpack-chain";
import { project } from "../project/project";

export const config = new Config();

function getProjectEntry() {
  return project.resolve("src/index.ts");
}

function getMode() {
  return "development" as const;
}

function getOutput() {
  return {
    filename: "index.js",
    path: project.resolve("dist"),
    libraryTarget: "commonjs2",
  } as const;
}

config.entry("index").add(getProjectEntry()).end();
config.mode(getMode());
