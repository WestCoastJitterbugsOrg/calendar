/**
 * @typedef { import("webpack").WebpackOptionsNormalized } WpConfig
 */

const { merge } = require('webpack-merge');
const wpDefaults = require('@wordpress/scripts/config/webpack.config');
const { DefinePlugin } = require('webpack');

/** @type {WpConfig} */
const toBeMerged = {
	plugins: [
		new DefinePlugin({
			wpCwfcEnv: JSON.stringify(wpDefaults.mode),
		}),
	],
};

customConfig = merge(wpDefaults, toBeMerged);

module.exports = customConfig;
