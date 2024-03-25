import { Configuration } from "@rspack/cli";
import { BannerPlugin } from "@rspack/core";
import path from "path";

import pkg from "./package.json";
import configJson from "./src/config.json";

const pluginConfig = configJson as Record<string, string>;
pluginConfig.version = pkg.version;

const meta = (() => {
  const lines = ["/**"];
  for (const key in pluginConfig) {
    lines.push(` * @${key} ${pluginConfig[key]}`);
  }
  lines.push(" */");
  return lines.join("\n");
})();

const config: Configuration = {
  mode: "development",
  target: "node",
  devtool: false,
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loader: "builtin:swc-loader",
        options: {
          sourceMap: true,
          jsc: {
            parser: {
              syntax: "typescript",
            },
          },
        },
        type: "javascript/auto",
      },
    ],
  },
  output: {
    filename: "UnreadVoiceText.plugin.js",
    path: path.join(__dirname, "dist"),
    library: {
      type: "commonjs2",
      export: "default",
    },
  },
  plugins: [new BannerPlugin({ raw: true, banner: meta })],
};

export default config;
