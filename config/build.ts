import path from "path";
import { build } from "./utils/esbuildUtils.ts";
import filterConsole from "./utils/filterConsoleUtils.ts";

const disableFilter = filterConsole(["MODULE_NOT_FOUND"]);

const outPath = path.resolve(".", "dist/");
const declarationPath = path.resolve(".", "lib/");

const srcPath = path.resolve(".", "src/");
const tsconfigPath = path.resolve(".", "tsconfig.json");
// console.log({ outDir, tsconfig });

build(import.meta.dirname, tsconfigPath, srcPath, outPath, declarationPath);
