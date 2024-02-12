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
			console.log(`esbuild: built with ${result.errors.length} errors`);
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
	target: 'esnext',
	outdir: 'build',
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

await esbuild.build(buildOptions);
