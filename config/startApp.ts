import path from "path";
import { start } from "./utils/esbuildUtils";


const rootPath = path.resolve(`.`,);

// Only the tsx entry — src/index.tsx already imports ./index.css, so esbuild
// emits it as index.css. (The old code pointed at a deliberately misspelled
// "index.css1" to skip the CSS entry and dodge an output-path collision.)
const entryPoints: string[] = [path.resolve(rootPath, `src/index.tsx`)];

const outDir = path.resolve(rootPath, `config/static/`);

start(entryPoints, outDir);
