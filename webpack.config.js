var path = require('path');

module.exports = {
    entry: {
        quiz: "./src/index.tsx",
    },

    mode: "development",

    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
        ]
    },

    devServer: {
        contentBase: __dirname,
        compress: true,
        port: 3000,
        host: '0.0.0.0',
        https: true,
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};