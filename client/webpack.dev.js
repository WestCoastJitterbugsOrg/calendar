const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = merge(common, {
    mode: 'development',
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        }],
    },
    stats: { colors: true },
    devServer: {
        contentBase: './dist',
        clientLogLevel: 'info',
        port: 8080,
        inline: true,
        historyApiFallback: false,
        hot: true,
        watchOptions: { aggregateTimeout: 300, poll: 500 },
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({ API_URL: JSON.stringify('http://localhost:8081') })
    ]
});