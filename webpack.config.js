/**
 * @typedef { import("webpack").WebpackOptionsNormalized } WpConfig
 */

const { mergeWithCustomize, unique, mergeWithRules } = require('webpack-merge');
const wpDefaults = require('@wordpress/scripts/config/webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const path = require('path');

// Replace the generated css module class names

/** @type {WpConfig} */
const customLoaderOptions = {
	module: {
		rules: [
			{
				test: /\.(sc|sa)ss$/,
				use: [
					{
						loader: require.resolve('css-loader'),
						options: {
							sourceMap: true,
							modules: {
								auto: true,
								localIdentName: '[path][name]__[local]--[hash:base64:5]',
							},
						},
					},
				],
			},
		],
	},
};

/** @type {WpConfig} */
let customConfig = mergeWithRules({
	module: {
		rules: {
			test: 'match',
			use: {
				loader: 'match',
				options: 'replace',
			},
		},
	},
})(wpDefaults, customLoaderOptions);

const mergeWithUpdatedMiniCssConfig = mergeWithCustomize({
	customizeArray: unique(
		'plugins',
		['MiniCssExtractPlugin'],
		(plugin) => plugin.constructor?.name
	),
});

/** @type {WpConfig} */
const toBeMerged = {
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'build/cw-filter-calendar'),
		chunkFilename: '[name]-[chunkhash].js',
		clean: true,
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		plugins: [new TsconfigPathsPlugin({})],
	},
	plugins: [
		new MiniCssExtractPlugin({
			insert: (styleElement) => {
				const styleLoadedEvent = new CustomEvent('cw-filter-style-loaded', {
					detail: styleElement,
				});
				window.dispatchEvent(styleLoadedEvent);
			},
			chunkFilename: '[name]-[chunkhash].css',
		}),
	],
};

customConfig = mergeWithUpdatedMiniCssConfig(customConfig, toBeMerged);

module.exports = customConfig;
