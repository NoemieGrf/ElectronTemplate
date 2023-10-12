const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const webpackBaseConfig = require('./webpack.base.config');

module.exports = merge(webpackBaseConfig, {
    mode: 'development',
    target: 'node',
    entry: path.join(__dirname, 'src/main/main.ts'),
    output: {
        path: path.join(__dirname, 'dist/main'),
        filename: 'main.js'
    },
    externals: [nodeExternals()],
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development'
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    node: {
        __dirname: false,
        __filename: false
    }
});