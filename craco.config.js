const path = require('path')
const resolve = dir => path.join(__dirname, '.', dir)

module.exports = {
    publicPath: "./",
    webpack: {
        alias: {
            "@": resolve("src"),
        },
        configure: (webpackConfig, { env, paths }) => {
            webpackConfig.output = {
                ...webpackConfig.output,
                publicPath: "./",
            };
            return webpackConfig;
        },
    },
};