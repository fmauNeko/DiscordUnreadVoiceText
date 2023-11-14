import path from "path";
import webpack from "webpack";

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

const config: webpack.Configuration = {
  mode: "development",
  target: "node",
  devtool: false,
  entry: "./src/index.ts",
  output: {
    filename: "UnreadVoiceText.plugin.js",
    path: path.join(__dirname, "dist"),
    libraryTarget: "commonjs2",
    libraryExport: "default",
    compareBeforeEmit: false,
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [new webpack.BannerPlugin({ raw: true, banner: meta })],
};

export default config;
