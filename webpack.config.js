const defaults = require('@wordpress/scripts/config/webpack.config');

const wpRules = defaults.module.rules.map((rule) => {
	const suffixTest = ['.scss', '.css', '.sass'].some((suffix) =>
		rule.test.test(suffix)
	);
	if (!suffixTest) {
		return rule;
	}

	const cssLoader = rule.use.find(
		(use) =>
			use.loader === require.resolve('css-loader') ||
			use.loader === 'css-loader'
	);
	cssLoader.options = {
		...cssLoader.options,
		modules: {
			...cssLoader.options.modules,
			localIdentName: '[path][name]__[local]--[hash:base64:5]',
		},
	};
	return rule;
});

module.exports = {
	...defaults,
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
	module: {
		...defaults.module,
		rules: wpRules,
	},
};

console.log(module.exports.module);
