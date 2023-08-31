const wpDefaults = require('@wordpress/scripts/config/webpack.config');
const { DefinePlugin } = require('webpack');

wpDefaults.devtool = 'eval-source-map';
wpDefaults.plugins.push(
	new DefinePlugin({
		wpCwfcEnv: JSON.stringify(wpDefaults.mode),
	}),
);
wpDefaults.module.rules.push({
	resourceQuery: /raw/,
	type: 'asset/source',
});

module.exports = wpDefaults;
