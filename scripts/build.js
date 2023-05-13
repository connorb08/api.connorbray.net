import { build } from "esbuild";

const config = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  external: ['@connorb08/crouter']
};

build({
  ...config,
  outfile: 'dist/index.js',
  platform: 'neutral', // for ESM
  format: "esm"
});