var path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/client/index.js',
    output: {
        library: 'Client',
        libraryTarget: 'var'
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 8000,
                        name: '[hash]-[name].[ext]',
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
    ]
}
