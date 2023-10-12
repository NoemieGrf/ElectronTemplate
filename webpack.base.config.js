module.exports = {
    module: {
        rules: [
            // typescript
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            // css (style loader在前 css loader在后)
            {
                test:/\.css$/,
                use: [ 'style-loader', 'css-loader'],
                exclude: /node_modules/
            },
            // .node native
            {
                test: /\.node$/,
                exclude: /node_modules/,
                use: 'node-loader'
            }
        ]
    }
};