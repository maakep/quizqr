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

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};