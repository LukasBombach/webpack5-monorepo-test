import { promises as fs } from "fs";
import path from "path";

function resolve(...paths: string[]) {
  return path.resolve(process.cwd(), ...paths);
}

async function getPackageJson() {
  const fileContents = await fs.readFile(resolve("package.json"), "utf-8");
  return JSON.parse(fileContents);
}

export const project = {
  resolve,
  getPackageJson,
};
