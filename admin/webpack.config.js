
const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

const VENDORS = [
    'axios',
    'normalize.css',
    'react',
    'react-dom',
    'react-id-swiper',
    'react-redux',
    'redux',
    'redux-logger',
    'redux-promise-middleware',
    'redux-thunk',
    'reactjs-localstorage',
    'react-router-dom',
    '@material-ui/core'
];

module.exports = {
    entry: {
        app: path.resolve('./', 'src'),
        vendors: VENDORS
    },
    output: {
        path: path.resolve('./', 'build'),
        filename: process.env.NODE_ENV === 'production' ? '[name].[chunkhash].bundle.js' : '[name].[hash].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['react']
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|otf|woff(2)?|ttf|eot|svg)$/i,
                use: 'file-loader'
            }
        ]
    },

    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all'
        }
    },

    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve('./', 'build'),
        compress: true,
        port: 660,
        hot: true
    },

    mode: process.env.NODE_ENV,

    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve('./', 'src', 'index.html')
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(
                process.env.NODE_ENV
            )
        })
    ]
}

if(process.env.NODE_ENV !== 'production'){
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.HotModuleReplacementPlugin()
    ]);
}