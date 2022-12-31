import path from "path";
import fs from "fs";
import { start } from "./utils/esbuildUtils";


const rootPath = path.resolve(`.`,);

const cssFilePath = path.resolve(rootPath, `app/index.css`);
const entryPoints = [path.resolve(rootPath, `app/index.tsx`), fs.existsSync(cssFilePath) ? cssFilePath : undefined].filter(value => value !== undefined);

const outDir = path.resolve(rootPath, `config/static/`);

start(entryPoints, outDir);
