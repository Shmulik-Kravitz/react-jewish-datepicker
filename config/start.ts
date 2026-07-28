import path from "path";
import { start } from "./utils/esbuildUtils";


const rootPath = path.resolve(`.`,);

// Only the tsx entry. Any CSS it imports is emitted alongside as index.css —
// listing app/index.css as a second entry point makes esbuild try to write that
// same output path twice and fail with "Two output files share the same path".
const entryPoints: string[] = [path.resolve(rootPath, `app/index.tsx`)];

const outDir = path.resolve(rootPath, `config/static/`);

start(entryPoints, outDir);
