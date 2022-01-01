import { Configuration } from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";

// https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#configuration-file
module.exports = {
  webpack: {
    // https://webpack.js.org/configuration
    configure: (webpackConfig: Configuration) => {
      webpackConfig.plugins?.push(
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
        })
      );

      return webpackConfig;
    },
  },
};
