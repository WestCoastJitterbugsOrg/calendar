// @ts-check
/** @typedef { import("webpack").Configuration } Configuration */
/** @typedef { import("webpack").Plugin } Plugin */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const externals = require('./externals.js');
const path = require('path');
const process = require('process');

module.exports = {
  style: {
    postcss: {
      plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  webpack: {
    // https://webpack.js.org/configuration
    configure: (/** @type {Configuration} */ webpackConfig, { env, paths }) => {

      //#region Don't bundle externals (react, react-dom, jquery)
      switch (typeof webpackConfig.externals) {
        case "object":
          if (webpackConfig.externals instanceof Array) {
            webpackConfig.externals = [...webpackConfig.externals, ...Object.values(externals)];
          } else if (webpackConfig.externals instanceof RegExp) {
            webpackConfig.externals = new RegExp(webpackConfig.externals.source + '|' + Object.values(externals).join('|'));
          } else {
            webpackConfig.externals = { ...webpackConfig.externals, ...externals };
          }
          break;
        case "string":
          webpackConfig.externals = [webpackConfig.externals, ...Object.values(externals)];
          break;
        case "function":
          // TODO: Figure out what to do if externals is of type ExternalsFunctionElement
          throw Error('Not implemented');
        case "undefined":
          webpackConfig.externals = externals;
          break;
        default:
          throw Error('Unknown configuration type: ' + typeof webpackConfig.externals);
      }
      //#endregion


      if (env === "development") {
        //@ts-ignore
        webpackConfig.plugins.push(new CopyWebpackPlugin({
          patterns: [
            {
              from: require.resolve('react/umd/react.development.js'),
              to: 'js/[name].js'
            }, {
              from: require.resolve('react-dom/umd/react-dom.development.js'),
              to: 'js/[name].js'
            }, {
              from: require.resolve('jquery/dist/jquery.js'),
              to: 'js/[name].js'
            }
          ]
        }));
        return webpackConfig;
      }

      //#region Staging and production build configurations

      webpackConfig.optimization.splitChunks = {
        chunks: (_) => false,
        cacheGroups: {
          default: false
        }
      };

      webpackConfig.optimization.runtimeChunk = false;

      let buildPath = 'build';
      if (process.env.HOST_TYPE === "wpdev") {
        buildPath = 'wp-plugin/wp-content/plugins/wcjcal';
      } 
      paths.appBuild = webpackConfig.output.path = path.resolve(__dirname, buildPath);

      webpackConfig.output.filename = `js/bundle.js`;
      webpackConfig.output.chunkFilename = `js/[name].js`;

      const disabledPlugins = [
        'GenerateSW',
        'ManifestPlugin',
        'InterpolateHtmlPlugin',
        'InlineChunkHtmlPlugin',
        'HtmlWebpackPlugin',
      ];

      // @ts-ignore
      webpackConfig.plugins = webpackConfig.plugins.reduce((/** @type {Plugin[]} */  plugins, /** @type {Plugin} */ pluginItem) => {

        if (disabledPlugins.indexOf(pluginItem.constructor.name) >= 0) {
          return plugins;
        }

        if (pluginItem instanceof MiniCssExtractPlugin) {
          plugins.push(
            // @ts-ignore
            new MiniCssExtractPlugin({
              filename: path.resolve(buildPath, '/css/[name].css'),
              chunkFilename: path.resolve(buildPath, '/css/[name].css')
            })
          );
        } else {
          plugins.push(pluginItem);
        }

        return plugins;
      }, []);

      //#endregion

      return webpackConfig;
    },
    
  },

  //https://webpack.js.org/configuration/dev-server/#devserver
  devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
    devServerConfig.writeToDisk = true;
    return devServerConfig;
  },



}