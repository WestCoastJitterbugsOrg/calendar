import * as webpack from 'webpack';

const wpDefaults = // eslint-disable-next-line @typescript-eslint/no-var-requires
	require('@wordpress/scripts/config/webpack.config') as webpack.Configuration;

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

	const ruleUse = rule.use as {
		loader: string;
		options: { modules: { localIdentName: string } };
	}[];

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

const config: webpack.Configuration = {
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

export default config;
