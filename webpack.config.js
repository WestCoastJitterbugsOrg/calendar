// @ts-check

/**
 * @typedef { import("webpack").Configuration } WpConfig
 */

// @ts-ignore
const { mergeWithCustomize, unique, mergeWithRules } = require('webpack-merge');
// @ts-ignore
const wpDefaults = require('@wordpress/scripts/config/webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

// Replace the generated css module class names
const replaceLoaderOptions = mergeWithRules({
	module: {
		rules: {
			test: 'match',
			use: {
				loader: 'match',
				options: 'replace',
			},
		},
	},
});

/** @type {WpConfig} */
const configWithReadableCssClasses = replaceLoaderOptions(wpDefaults, {
	module: {
		rules: [
			{
				test: /\.(sc|sa)ss$/,
				use: [
					{
						loader: require.resolve('css-loader'),
						options: {
							modules: {
								localIdentName: '[path][name]__[local]--[hash:base64:5]',
							},
						},
					},
				],
			},
		],
	},
});

// Generate css file names with hashes
/** @type {WpConfig} */
let resultConfig = mergeWithCustomize({
	customizeArray: unique(
		'plugins',
		['MiniCssExtractPlugin'],
		(plugin) => plugin.constructor?.name
	),
})(configWithReadableCssClasses, {
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
});

module.exports = resultConfig;
