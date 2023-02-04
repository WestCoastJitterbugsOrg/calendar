// @ts-check

/**
 * @typedef { import("webpack").Configuration } WpConfig
 */

/**
 * @type {WpConfig}
 */
// @ts-ignore
const wpDefaults = require('@wordpress/scripts/config/webpack.config');

const rules = wpDefaults.module?.rules ?? [];
// Look for the css-loader from the wp defaults and modify it to output better css module class names
for (const rule of rules) {
	if (rule === '...') {
		continue;
	}
	const ruleTest = rule.test;
	if (!(ruleTest instanceof RegExp)) {
		continue;
	}
	const suffixTest = ['.scss', '.css', '.sass'].some((suffix) =>
		ruleTest.test(suffix)
	);
	if (!suffixTest) {
		continue;
	}

	/** @type {{ loader: string; options: { modules: { localIdentName: string } };}[]}*/
	// @ts-ignore
	const ruleUse = rule.use;

	const cssLoader = ruleUse.find(
		(use) =>
			use.loader === require.resolve('css-loader') ||
			use.loader === 'css-loader'
	);

	if (!cssLoader) {
		continue;
	}
	cssLoader.options = {
		...cssLoader.options,
		modules: {
			...cssLoader.options.modules,
			localIdentName: '[path][name]__[local]--[hash:base64:5]',
		},
	};
}

/** @type {WpConfig} */
const config = {
	...wpDefaults,
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
	module: {
		...wpDefaults.module,
		rules,
	},
};

module.exports = config;
