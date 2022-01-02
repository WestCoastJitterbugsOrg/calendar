import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import { DefinePlugin } from "webpack";
import ESLintPlugin from "eslint-webpack-plugin";

module.exports = (env: any) => ({
  entry: path.join(__dirname, "src", "index.tsx"),
  output: {
    path: path.join(__dirname, "build"),
    filename: "js/bundle.js",
    chunkFilename: "js/[name].js",
  },
  mode: env.NODE_ENV || "development",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    watchFiles: {
      paths: ["src/**/*", "public/**/*"],
    },
    compress: true,
    port: 9000,
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: path.join("css", "[name].css"),
      chunkFilename: path.join("css", "[name].css"),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: require.resolve("react/umd/react.development.js"),
          to: "js/[name].js",
        },
        {
          from: require.resolve("react-dom/umd/react-dom.development.js"),
          to: "js/[name].js",
        },
        {
          from: require.resolve("jquery/dist/jquery.js"),
          to: "js/[name].js",
        },
      ],
    }),
    new DefinePlugin({ API_URL: `"${env.API_URL}"` }),
    new ESLintPlugin({}),
  ],
});
