import path from "path";
import fs from "fs";
import { start } from "./utils/esbuildUtils";


const rootPath = path.resolve(`.`,);

const cssFilePath = path.resolve(rootPath, `src/index.css1`);
const entryPoints: string[] = [path.resolve(rootPath, `src/index.tsx`), fs.existsSync(cssFilePath) ? cssFilePath : ""].filter(value => value !== "");

const outDir = path.resolve(rootPath, `config/static/`);

start(entryPoints, outDir);
