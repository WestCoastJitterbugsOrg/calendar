import esbuild from "esbuild";
import {sassPlugin, postcssModules} from "esbuild-sass-plugin";

const result = await esbuild.build({
    entryPoints: ['src/AppInit.tsx', 'src/App.tsx'],
    bundle: true,
    outdir: 'dist',
    loader: {
        '.svg': 'dataurl',
        '.png': 'dataurl'
    },
    // platform: 'node',
    plugins: [
        sassPlugin({
            transform: postcssModules({})
        })
    ]
})