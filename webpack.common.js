const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: {
      import: './src/index.ts',
      dependOn: ['jquery', 'fc-core', 'fc-views']
    },
    jquery: 'jquery',
    'fc-core': ['@fullcalendar/core'],
    'fc-views': ['@fullcalendar/daygrid', '@fullcalendar/list', '@fullcalendar/timegrid']
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false
      }
    },
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        // Creates `style` nodes from JS strings
        "style-loader",
        // Translates CSS into CommonJS
        "css-loader",
        // Compiles Sass to CSS
        "sass-loader",
      ]
    }, {
      test: /\.css$/i,
      use: [
        // Creates `style` nodes from JS strings
        "style-loader",
        // Translates CSS into CommonJS
        "css-loader"
      ]
    }
    ],
  },
  plugins: [
    new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
    new HtmlWebpackPlugin({
      title: 'Personal calendar',
      favicon: "./src/favicon.ico",
      template: './src/index.html'
    })],
  resolve: {
    // Makes it possible to import without extensions, as follows:
    // import File from '../path/to/file';
    extensions: ['.ts', '.js'],
  },
  optimization: {
    runtimeChunk: 'single'
  }
};