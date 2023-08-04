/**
 * @typedef { import("esbuild") } esbuild
 */

/* eslint-disable */
import * as esbuild from 'esbuild';
import { sassPlugin, postcssModules } from 'esbuild-sass-plugin';
import child_process from 'node:child_process';

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
const isWin = process.platform === 'win32';
const tscCommand = isWin ? 'tsc.cmd' : 'tsc';

if (watch) {
	child_process.spawn(tscCommand, ['--watch'], { stdio: 'inherit' });

	const esbuildContext = await esbuild.context(buildOptions);
	esbuildContext.watch();
} else {
	child_process.spawn(tscCommand, { stdio: 'inherit' });
	esbuild.build(buildOptions);
}
