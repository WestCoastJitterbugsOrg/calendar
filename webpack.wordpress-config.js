const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

/** @type {(env: any) => import('webpack-dev-server').WebpackConfiguration} */
module.exports = (env) => {
  process.env.NODE_ENV = env.production ? "production" : "development";
  return {
    entry: path.join(__dirname, "src", "index.tsx"),
    output: {
      path: path.join(__dirname, "build"),
      filename: "wcjcal.js",
      clean: true,
      chunkFilename: "[chunkhash].wcjcal.js"
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      plugins: [new TsconfigPathsPlugin({})],
    },
    devtool: "source-map",
    mode: process.env.NODE_ENV,
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
        },
        {
          test: /\.(css)$/,
          use: [
            { loader: "css-loader", options: { sourceMap: true } },
            "postcss-loader",
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "public/*.php",
            to: "[name][ext]",
          },
        ],
      }),
      new ESLintPlugin({}),
    ],
  };
};
