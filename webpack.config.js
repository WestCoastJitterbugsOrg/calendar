// @ts-check

/**
 * @typedef { import("webpack").Configuration } WpConfig
 */

/**
 * @type {WpConfig}
 */
// @ts-ignore
const { merge } = require('webpack-merge');
// @ts-ignore
const wpDefaults = require('@wordpress/scripts/config/webpack.config');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const path = require('path');

/** @type {WpConfig} */
const config = merge(wpDefaults, {
	mode: 'development',
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		plugins: [new TsconfigPathsPlugin({})],
	}
});

module.exports = config;
