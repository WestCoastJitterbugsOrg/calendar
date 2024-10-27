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

export default tsup.defineConfig({
	entry: ['src/index.tsx'],
	format: 'esm',
	target: 'esnext',
	outDir: 'build',
	loader: {
		'.svg': 'dataurl',
		'.png': 'dataurl',
	},
	esbuildPlugins: [scssPlugin],
	clean: true,
	platform: 'browser',
	sourcemap: true,
	dts: true,
	minify: false,
});
