import { resolve } from "path";

export type resolve = (...paths: string[]) => string;

export const monopack: resolve = (...paths) =>
  resolve(__dirname, "..", ...paths);
export const project: resolve = (...paths) => resolve(process.cwd(), ...paths);
export const src: resolve = (...paths) => project("src", ...paths);
export const dist: resolve = (...paths) => project("dist", ...paths);
