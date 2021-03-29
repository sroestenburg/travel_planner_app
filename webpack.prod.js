const common = require ("./webpack.common");
const {merge} = require ("webpack-merge");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, "css-loader", "sass-loader" ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ 
            filename: "[name].css",
        }),
        new WorkboxPlugin.GenerateSW()
    ]
});
