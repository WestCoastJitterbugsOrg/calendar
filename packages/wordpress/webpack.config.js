const wpDefaults = require('@wordpress/scripts/config/webpack.config');
const { DefinePlugin } = require('webpack');

if (wpDefaults.mode === 'production') {
	wpDefaults.devtool = 'source-map';
} else {
	wpDefaults.devtool = 'eval-source-map';
}

wpDefaults.plugins.push(
	new DefinePlugin({
		wpCwfcEnv: JSON.stringify(wpDefaults.mode),
	}),
);
wpDefaults.module.rules.push({
	resourceQuery: /raw/,
	type: 'asset/source',
});

wpDefaults.output = {
	chunkFilename: '[name]-[chunkhash].js',
	clean: true,
};

module.exports = wpDefaults;
