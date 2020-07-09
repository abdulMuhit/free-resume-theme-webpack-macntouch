const path = require('path');
const common = require('./webpack.common')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, "dist"),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
         new CopyWebpackPlugin([
            { from: './src/images', to: 'images' },
            { from: './src/icons', to: 'icons' },
            { from: './src/fonts', to: 'fonts' },
            { from: './src/scripts', to: 'scripts' }
        ])
    ]
})