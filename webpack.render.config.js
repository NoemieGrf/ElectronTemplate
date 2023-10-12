const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackBaseConfig = require('./webpack.base.config');

module.exports = merge(webpackBaseConfig, {
    mode: 'development',
    target: 'electron-renderer',
    entry: path.join(__dirname, 'src/renderer/index/render.ts'),
    output: {
        path: path.join(__dirname, 'dist/renderer/index'),
        filename: 'render.js'
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development'
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            scriptLoading: 'defer',
            minify: false,
            filename: 'index.html',
            template: path.join(__dirname, 'src/renderer/index/index.html')
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }
});