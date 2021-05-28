const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const { default: merge } = require('webpack-merge');

module.exports = {
  entry: { index: './index.ts' },
  context: path.resolve(__dirname, 'src'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/[name].[chunkhash:8].js'
  },
  externals: { jquery: 'jQuery', moment: 'moment' },
  module: {
    rules: [{
      test: /\.ts$/,
      use: [{ loader: 'ts-loader', options: { onlyCompileBundledFiles: true } }]
    }],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: 'index.html', inject: 'body', scriptLoading: 'defer' })
  ],
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'client')],
    extensions: ['.ts', '.js', 'scss'],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  }
};
