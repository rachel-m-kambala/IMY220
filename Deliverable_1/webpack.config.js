const path = require('path');
module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve("public"),
        filename: 'bundle.js',
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
        ]
    }
}