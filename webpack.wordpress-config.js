const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

/** @type {(env: any) => import('webpack-dev-server').WebpackConfiguration} */
module.exports = (env) => {
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
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
        },
        {
          test: /\.(css)$/,
          use: ["css-loader", "postcss-loader"],
        },
      ],
    },
    externals: {
      jquery: "jQuery",
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
      ...(env.production
        ? [
          new ZipPlugin({
            filename: "wcjcal.zip",
            pathPrefix: "wcjcal",
          }),
        ]
        : []),
    ],
    optimization: {
      minimizer: ["...", new CssMinimizerPlugin()],
    },
  };
};
