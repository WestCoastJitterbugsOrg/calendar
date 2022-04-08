import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import { DefinePlugin, WebpackPluginInstance } from "webpack";
import ESLintPlugin from "eslint-webpack-plugin";
import ZipPlugin from "zip-webpack-plugin";
import { WebpackConfiguration } from "webpack-dev-server";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

module.exports = (env: any): WebpackConfiguration => {
  return {
    entry: path.join(__dirname, "src", "index.tsx"),
    output: {
      path: path.join(__dirname, "build"),
      filename: "wcjcal.js",
      clean: true,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      plugins: [new TsconfigPathsPlugin({})],
    },
    devtool: "source-map",
    mode: env.production ? "production" : "development",
    performance: {
      // We don't want to do code splitting because it makes it harder to load the scripts in the wordpress plugin,
      // So we let the asset sizes be larger than recommended in order to remove warnings
      // 1024 ** 2 bytes == 1 MiB
      maxEntrypointSize: 1024 ** 2,
      maxAssetSize: 1024 ** 2,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
        },
        {
          test: /\.(css)$/,
          use: [
            "css-loader",
            "postcss-loader",
          ],
        },
      ],
    },
    externals: {
      // react: "React",
      // "react-dom": "ReactDOM",
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "wcjcal.css",
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "public/*.php",
            to: "[name][ext]",
          },
        ],
      }),
      new DefinePlugin({
        API_URL: `"${env.API_URL}"`,
        nodeenv: env.production ? "production" : "development",
      }),
      new ESLintPlugin({}),
      ...(env.production
        ? [
            new ZipPlugin({
              filename: "wcjcal.zip",
              pathPrefix: "wcjcal",
            }) as unknown as WebpackPluginInstance,
          ]
        : []),
    ],
    optimization: {
      minimizer: ["...", new CssMinimizerPlugin()],
    },
  };
};
