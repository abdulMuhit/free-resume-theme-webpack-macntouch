const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    module: {
        rules: [
            { test: /\.handlebars$/, loader: "handlebars-loader" },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                },
                /*     loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                      } */
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                            /*   attrs: ['img:src', 'link:href'] */
                        }
                    }
                ]
            },
            {
                test: /\.ejs$/,
                use: [
                    {
                        loader: "ejs-webpack-loader",
                        options: {
                            htmlmin: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|webp|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/img/',
                            useRelativePath: true,
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                          mozjpeg: {
                            progressive: true,
                            quality: 65
                          },
                          optipng: {
                            enabled: true,
                          },
                          pngquant: {
                            quality: '65-90',
                            speed: 4
                          },
                          gifsicle: {
                            interlaced: false,
                          },
                          webp: {
                            quality: 75
                          }
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: "[name].[ext]",
                        outputPath: 'assets/fonts',
                        publicPath: '/assets/fonts'
                    }
                },
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            // filename: path.resolve(__dirname, 'index.html'),
            minify: false,
        })
    ],
/*    devServer: {
        contentBase: path.join(__dirname, 'dist'),
    } */
}