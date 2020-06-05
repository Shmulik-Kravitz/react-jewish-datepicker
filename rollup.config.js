import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import sass from "rollup-plugin-sass";
import html from '@rollup/plugin-html';

import packageJson from "./package.json";

export default [{
  input: "src/index.ts",
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
    peerDepsExternal(),
    resolve({
      extensions: ['.ts', '.tsx'],
    }),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    sass({
      insert: true
    }),
  ]
},
//  {
//   input: "src/index.ts",
//   output: [
//     {
//       file: 'example/index.js',
//       format: 'iife',
//     }
//   ],
//   plugins: [
//     resolve({
//       extensions: ['.ts', '.tsx']
//     }),
//     commonjs({
//       include: 'node_modules/**'
//     }),
//     typescript({ useTsconfigDeclarationDir: true }),
//     sass({
//       insert: true
//     }),
//     html({
//       fileName: 'index.html',
//       title: 'Rollup + TypeScript + React = ❤️',
//       template: ({ title }) => {
//         return `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="utf-8">
//   <title>${title}</title>
//   <link rel="stylesheet" href="/index.css">
// </head>
// <body>
//   <div id="app"></div>
//   <script src="index.js"></script>
// </body>
// </html>
// `;
//       },
//     }),
//   ]
// }
];