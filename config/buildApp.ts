import path from "path";
import { buildApp } from "./utils/esbuildUtils";
import filterConsole from "./utils/filterConsoleUtils";

const disableFilter = filterConsole(["MODULE_NOT_FOUND"]);

const outPath = path.resolve(".", "dist/");
const declarationPath = path.resolve(".", "lib/");

const srcPath = path.resolve(".", "src/");
const tsconfigPath = path.resolve(".", "tsconfig.json");
// console.log({ outDir, tsconfig });

buildApp(__dirname, tsconfigPath, srcPath, outPath, declarationPath);
