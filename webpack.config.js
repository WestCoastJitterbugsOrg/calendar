// @ts-check

/**
 * @typedef { import("webpack").Configuration } WpConfig
 */

// @ts-ignore
const { merge, mergeWithCustomize, unique } = require('webpack-merge');
// @ts-ignore
const wpDefaults = require('@wordpress/scripts/config/webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

/** @type {WpConfig} */
const customConf = {
	mode: 'development',
	output: {
		chunkFilename: '[name]-[chunkhash].js',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		plugins: [new TsconfigPathsPlugin({})],
	},
	plugins: [
		new MiniCssExtractPlugin({
			chunkFilename: '[name]-[chunkhash].css',
		}),
	],
};

/** @type { WpConfig } */
const config = mergeWithCustomize({
	customizeArray: unique(
		'plugins',
		['MiniCssExtractPlugin'],
		(plugin) => plugin.constructor?.name
	),
})(wpDefaults, customConf);

module.exports = config;
