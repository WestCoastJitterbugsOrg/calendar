const webpack = require('webpack');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  output: {
    publicPath: '/',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:8].css',
      chunkFilename: 'css/[id].[chunkhash:8].css',
    }),
    new webpack.DefinePlugin({ API_URL: JSON.stringify('https://calendar.the-wcj.guru/api') })

  ],
});