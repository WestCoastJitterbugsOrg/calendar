const defaults = require('@wordpress/scripts/config/webpack.config');

module.exports = {
	...defaults,
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
	module: {
		...defaults.module,
		rules: [
			...defaults.module.rules,
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: 'tsconfig.json',
							transpileOnly: true,
						},
					},
				],
			},
		],
	},
};
