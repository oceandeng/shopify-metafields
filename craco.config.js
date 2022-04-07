const path = require('path')
const resolve = dir => path.join(__dirname, '.', dir)

const isProduction = process.env.NODE_ENV == 'production'

module.exports = {
    webpack: {
        alias: {
            "@": resolve("src"),
        },
        configure: (webpackConfig, { env, paths }) => {

            webpackConfig.output = {
                ...webpackConfig.output,
                publicPath: isProduction ? "/shopify-metafields/" : '/',
            };
            return webpackConfig;
        },
    },
};