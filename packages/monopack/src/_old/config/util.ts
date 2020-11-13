import { resolve } from "path";

export const cwd = (...paths: string[]) => resolve(process.cwd(), ...paths);
export const root = (...paths: string[]) =>
  resolve(__dirname, "../..", ...paths);

export const project = {
  getEntry: () => cwd("src", "index.ts"),
  getMode: () => "development" as const,
  getOutputFileName: () => "index.js" as const,
  getOutputPath: () => cwd("dist"),
  getSrcPath: () => cwd("src"),
  getPeerDepsAsExternals: () => ({}), // todo
};

export const isDev = () => project.getMode() === "development";
export const getMonopackModules = () => root("node_modules");
export const getFastBuild = () => ({
  minimize: false,
  usedExports: true,
  removeAvailableModules: false,
  removeEmptyChunks: false,
  splitChunks: false,
});
export const getPlugins = () => []; // todo

export const getSmallBundle = () => ({});
