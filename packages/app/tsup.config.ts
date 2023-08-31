import { sassPlugin, postcssModules } from 'esbuild-sass-plugin';
import * as tsup from 'tsup';

type Plugin = NonNullable<tsup.Options['esbuildPlugins']>[0];

const scssPlugin = sassPlugin({
	transform: async (css, resolveDir, filePath) => {
		if (filePath.endsWith('.module.scss')) {
			return postcssModules({})(css, resolveDir, filePath);
		} else {
			return css;
		}
	},
}) as Plugin;

const statusPlugin = {
	name: 'status',
	setup(build) {
		build.onEnd((result) => {
			console.log(`esbuild: built with ${result.errors.length} errors`);
		});
	},
} satisfies Plugin;

export default tsup.defineConfig({
	entry: ['src/index.tsx'],
	bundle: true,
	format: 'esm',
	target: 'esnext',
	outDir: 'build',
	loader: {
		'.svg': 'dataurl',
		'.png': 'dataurl',
	},
	splitting: true,
	esbuildPlugins: [scssPlugin, statusPlugin],
	clean: true,
	platform: 'browser',
	sourcemap: true,
	dts: true,
});
