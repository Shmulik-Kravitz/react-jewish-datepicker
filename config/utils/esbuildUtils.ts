import { build as esbuild, serve, BuildOptions } from "esbuild";
import nodeExternalsPlugin from "esbuild-node-externals";
import hasFlag from "has-flag";
import path from "path";
import fs from "fs";
import { Colors } from "./colorsUtils";
import { buildDeclarations } from "./tsUtils";

export const baseConfig: BuildOptions = {
  bundle: true,
  sourcemap: true,
  // splitting: true,
};

export const start = async (entryPoints: string[], outDir: string) => {
  const start = new Date().getTime();
  serve(
    {
      port: 8000,
      servedir: "./config/static",
      onRequest: (args) => {
        // console.log(args);
      },
    },
    {
      // plugins: [pnpPlugin()],
      ...baseConfig,
      entryPoints: entryPoints,
      outdir: outDir,
    }
  ).then((server) => {
    console.log(`http://127.0.0.1:${server.port}/`);

    const end = new Date().getTime();
    const time = end - start;
    console.log(
      Colors.FgGreen,
      `Started in ${(time / 1000).toFixed(5)} sec.`,
      Colors.Reset
    );

    // Call "stop" on the web server to stop serving
    // server.stop()
  });
};

export const build = async (
  bashPath: string,
  tsconfigPath: string,
  srcPath: string,
  outPath: string,
  declarationsOutPath: string
) => {
  const start = new Date().getTime();
  const baseBuildConfig = {
    ...baseConfig,
    plugins: [
      // pnpPlugin(),
      nodeExternalsPlugin(),
    ],
    entryPoints: ["./src/index.ts"],
    watch: hasFlag("watch"),
    minify: true,
  };
  const buildCJS = esbuild({
    ...baseBuildConfig,
    format: "cjs",
    outdir: outPath,
  });
  const outPathESM = path.resolve(outPath, "esm");
  const buildESM = esbuild({
    ...baseBuildConfig,
    format: "esm",
    outdir: outPathESM,
  });

  Promise.all([buildCJS, buildESM])
    .then(async () => {
      const endBuild = new Date().getTime();
      const timeBuild = endBuild - start;

      const esmCssFilePath = path.resolve(outPathESM, "index.css");
      const esmCssMapFilePath = esmCssFilePath + ".map";
      // console.log({ esmCssFilePath, esmCssMapFilePath });
      fs.rmSync(esmCssFilePath);
      fs.rmSync(esmCssMapFilePath);

      console.log(
        Colors.FgGreen,
        `Build done in ${(timeBuild / 1000).toFixed(3)} sec.`,
        Colors.Reset
      );

      // https://gist.github.com/jeremyben/4de4fdc40175d0f76892209e00ece98f
      await buildDeclarations(
        bashPath,
        tsconfigPath,
        srcPath,
        declarationsOutPath
      );
      const end = new Date().getTime();
      const time = end - endBuild;
      console.log(
        Colors.FgGreen,
        `Build declarations done in ${(time / 1000).toFixed(3)} sec.`,
        Colors.Reset
      );
    })
    .catch((err) => {
      // console.error(err.error);
      process.exit(1);
    });
};

export const buildApp = async (
  bashPath: string,
  tsconfigPath: string,
  srcPath: string,
  outPath: string,
  declarationsOutPath: string
) => {
  const start = new Date().getTime();
  const baseBuildConfig = {
    ...baseConfig,
    entryPoints: ["./src/index.tsx"],
    minify: true,
  };
  const build = esbuild({
    ...baseBuildConfig,
    format: "cjs",
    outdir: outPath,
  });

  build
    .then(async () => {
      const endBuild = new Date().getTime();
      const timeBuild = endBuild - start;

      console.log(
        Colors.FgGreen,
        `Build done in ${(timeBuild / 1000).toFixed(3)} sec.`,
        Colors.Reset
      );

      // https://gist.github.com/jeremyben/4de4fdc40175d0f76892209e00ece98f
      await buildDeclarations(
        bashPath,
        tsconfigPath,
        srcPath,
        declarationsOutPath
      );
      const end = new Date().getTime();
      const time = end - endBuild;
      console.log(
        Colors.FgGreen,
        `Build declarations done in ${(time / 1000).toFixed(3)} sec.`,
        Colors.Reset
      );
    })
    .catch((err) => {
      // console.error(err.error);
      process.exit(1);
    });
};
