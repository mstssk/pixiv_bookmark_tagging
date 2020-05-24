import copy from "rollup-plugin-copy";
import typescript from "@rollup/plugin-typescript";
import cleaner from "rollup-plugin-cleaner";

const OUT_DIR = "./dist";

export default {
  input: "src/index.ts",
  output: {
    dir: OUT_DIR,
    format: "es",
  },
  plugins: [
    cleaner({
      targets: [OUT_DIR],
    }),
    typescript(),
    copy({
      targets: [
        {
          src: "src/img",
          dest: OUT_DIR,
        },
        {
          src: "src/manifest.json",
          dest: OUT_DIR,
          transform(content) {
            const manifest = JSON.parse(content);
            manifest.description = process.env.npm_package_description;
            manifest.version = process.env.npm_package_version;
            return JSON.stringify(manifest, null, 2);
          },
        },
      ],
    }),
  ],
};
