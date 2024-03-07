// ex. scripts/build_npm.ts
import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

const text = await Deno.readTextFile('dist/package.json').catch(e => undefined)
const version = text
  ? JSON.parse(text).version
  : '0.1.0'

await emptyDir("./dist");

await build({
  entryPoints: ["./src/index.ts"],
  outDir: "./dist",
  typeCheck: 'both',
  test: false,
  scriptModule: false,
  packageManager: 'yarn',
  
  shims: {
    // see JS docs for overview and more options
    deno: false,
  },
  package: {
    // package.json properties
    name: "scoresheet-models",
    version,
    description: "Tools for storing, rendering and parsing chess scoresheet models ",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/moveread/scoresheet-models",
    },
  },
  postBuild() {
    Deno.copyFileSync("README.md", "dist/README.md");
  },
});