const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { DefinePlugin } = require("webpack");

module.exports = env => ({
    entry: path.join(__dirname, "src", "index.tsx"),
    output: {
        path: path.join(__dirname, "build"),
        filename: "js/bundle.js",
        chunkFilename: "js/[name].js"
    },
    mode: env.NODE_ENV || "development",
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.(css|scss)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
            }
        ],
    },
    externals: {
        react: "React",
        "react-dom": "ReactDOM",
        jquery: "jQuery",
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: path.join("css", "[name].css"),
            chunkFilename: path.join("css", "[name].css"),
        }),
        new CopyWebpackPlugin({
            patterns: ["public/wcj-calendar.php"],
        }),
        new DefinePlugin(
            {API_URL: `"${env.API_URL}"`}
        )
    ]
});
