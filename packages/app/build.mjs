/**
 * @typedef { import("esbuild") } esbuild
 */

/* eslint-disable */
import * as esbuild from 'esbuild';
import { sassPlugin, postcssModules } from 'esbuild-sass-plugin';

const statusPlugin = {
	name: 'status',
	setup(build) {
		build.onEnd((result) => {
			console.log(`build ended with ${result.errors.length} errors`);
		});
	},
};

/**
 * @type {esbuild.BuildOptions}
 */
const buildOptions = {
	entryPoints: ['src/index.tsx'],
	bundle: true,
	format: 'esm',
	jsx: 'automatic',
	outdir: 'dist',
	loader: {
		'.svg': 'dataurl',
		'.png': 'dataurl',
	},
	splitting: true,
	plugins: [
		sassPlugin({
			transform: async (css, resolveDir, filePath) => {
				if (filePath.endsWith('.module.scss')) {
					return postcssModules({})(css, resolveDir, filePath);
				} else {
					return css;
				}
			},
		}),
		statusPlugin,
	],
};
const watch = process.argv.includes('--watch');
if (watch) {
	const ctx = await esbuild.context(buildOptions);
	await ctx.watch();
} else {
	await esbuild.build(buildOptions);
}
