import externals from 'rollup-plugin-node-externals'
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import sass from "rollup-plugin-sass";

import packageJson from "./package.json";

export default [{
  input: "src/index.ts",
  external: ['ms'],
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true
    }
  ],
  plugins: [
    // peerDepsExternal(),
    // resolve({
    //   extensions: ['.ts', '.tsx'],
    // }),
    externals({
      // The path(s) to your package.json. Optional.
      // Can be a string or an array of strings for monorepos -- see below
      packagePath: 'package.json',
 
      // Make node builtins external. Optional. Default: true
      builtins: true,
 
      // Make pkg.dependencies external. Optional. Default: false
      deps: true,
 
      // Make pkg.peerDependencies external. Optional. Default: true
      peerDeps: true,
 
      // Make pkg.optionalDependencies external. Optional. Default: true
      optDeps: true,
 
      // Make pkg.devDependencies external. Optional. Default: true
      devDeps: true,
 
      // Modules to exclude from externals. Optional. Default: none
      exclude: [],
 
      // Modules to include in externals. Optional. Default: all
      include: [],
 
      // Deprecated -- see below
      except: []
    }),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    sass({
      insert: true
    }),
  ]
}
];