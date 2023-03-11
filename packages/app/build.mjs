/* eslint-disable */
import * as esbuild from 'esbuild';
import { sassPlugin, postcssModules } from 'esbuild-sass-plugin';

const examplePlugin = {
	name: 'example',
	setup(build) {
		build.onEnd((result) => {
			console.log(`build ended with ${result.errors.length} errors`);
		});
	},
};
const ctx = await esbuild.context({
	entryPoints: ['src/index.tsx', 'src/App.tsx'],
	bundle: true,
	outdir: 'dist',
	loader: {
		'.svg': 'dataurl',
		'.png': 'dataurl',
	},
	plugins: [
		sassPlugin({
			transform: postcssModules({}),
		}),
		examplePlugin,
	],
});

ctx.watch();
