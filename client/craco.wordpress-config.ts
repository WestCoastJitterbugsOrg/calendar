import { Configuration as wpConfig } from "webpack";
import { Configuration as devServerConfig } from "webpack-dev-server";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import process from "process";

// https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#configuration-file
module.exports = {
  // https://webpack.js.org/configuration
  webpack: { configure: wordpressWebpackConfig },
  //https://webpack.js.org/configuration/dev-server/#devserver
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
  } as devServerConfig,
};

function wordpressWebpackConfig(
  webpackConfig: wpConfig,
  context: { paths: any }
) {
  const buildPath =
    process.env.NODE_ENV === "development"
      ? "wp-build/wp-content/plugins/wcjcal"
      : "build";

  //#region Optimizations
  if (
    process.env.NODE_ENV === "production" &&
    webpackConfig.optimization != null
  ) {
    webpackConfig.optimization.splitChunks = {
      chunks: (_) => false,
      cacheGroups: {
        default: false,
      },
    };

    webpackConfig.optimization.runtimeChunk = false;
  }
  //#endregion

  //#region Output
  if (webpackConfig.output != null) {
    context.paths.appBuild = webpackConfig.output.path = path.resolve(
      __dirname,
      buildPath
    );

    webpackConfig.output.filename = `js/bundle.js`;
    webpackConfig.output.chunkFilename = `js/[name].js`;
  }
  //#endregion

  //#region Plugins
  const disabledPlugins = [
    "GenerateSW",
    "ManifestPlugin",
    "InterpolateHtmlPlugin",
    "InlineChunkHtmlPlugin",
    "HtmlWebpackPlugin",
  ];

  webpackConfig.plugins
    ?.filter(
      (pluginItem) => !disabledPlugins.includes(pluginItem.constructor.name)
    )
    ?.map((pluginItem) => {
      if (pluginItem instanceof MiniCssExtractPlugin) {
        return new MiniCssExtractPlugin({
          filename: path.resolve(buildPath, "/css/[name].css"),
          chunkFilename: path.resolve(buildPath, "/css/[name].css"),
        });
      } else {
        return pluginItem;
      }
    });
  //#endregion

  //#region Externals
  webpackConfig.externals = {
    react: "React",
    "react-dom": "ReactDOM",
    jquery: "jQuery",
  };
  //#endregion

  return webpackConfig;
}
