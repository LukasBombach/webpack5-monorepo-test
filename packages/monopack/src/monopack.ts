import path from "path";

function resolve(...paths: string[]) {
  return path.resolve(__dirname, "..", ...paths);
}

export const monopack = {
  resolve,
};
