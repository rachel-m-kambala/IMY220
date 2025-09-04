const path = require("path");
module.exports = {
    entry: "./frontend/src/index.js",
    output: {
        path: path.resolve(__dirname, "frontend", "public"),
        filename: "bundle.js"
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset/resource"
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(ttf|otf|woff|woff2|eot)$/i,
                type: "asset/resource"
            }
        ]
    }
}