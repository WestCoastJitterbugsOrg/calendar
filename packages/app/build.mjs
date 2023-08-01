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
	entryPoints: ['src/index.tsx'],
	bundle: true,
	format: 'esm',
	jsx: 'automatic',
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
