const path = require('path');
const common = require('./webpack.common')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractplugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].[contentHash].bundle.js',
        path: path.resolve(__dirname, "dist"),
        publicPath: '/'
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all'
            }
          }
        },
        minimizer: [new OptimizeCssAssetsPlugin()]
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractplugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractplugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractplugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
         new CopyWebpackPlugin([
            { from: './src/assets', to: 'assets' }
        ]),
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false
        })
    ]
})