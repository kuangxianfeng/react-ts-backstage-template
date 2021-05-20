/* eslint-disable unicorn/prefer-module */
/* eslint-disable unicorn/prefer-node-protocol */
const { override, addWebpackAlias, addLessLoader, overrideDevServer, addWebpackPlugin, addBundleVisualizer } = require('customize-cra')
const path = require('path')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')

const resolve = (dir) => path.join(__dirname, dir)
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    webpack: override(
        // 添加webpack的别名
        addWebpackAlias({
            '@': resolve('./src'),
            "com": resolve('./src/components'),
            "css": resolve('./src/styles'),
            "tools": resolve('./src/tools')
        }),
        // 添加lessOptions配置，修改antd的主题色
        addLessLoader(
            {
                lessOptions: {
                    javascriptEnabled: true,
                    modifyVars: { "@primary-color": "#1DA57A" }
                }
            },
            {
                // [path][name]__[local]--[hash:base64:8]
                localIdentName: "[local]--[hash:base64:8]",
            }
        ),
        // 添加webpack的插件
        addWebpackPlugin(new SimpleProgressWebpackPlugin()),
        addWebpackPlugin(new AntdDayjsWebpackPlugin()),
        // 打包分析大小插件
        addBundleVisualizer({
            "analyzerMode": "static",
            "reportFilename": "report.html",
            openAnalyzer: false,// 关闭Ctrl+s就打开report.html文件
        }),
        // 去掉了打包之后的js map文件
        (config) => {
            if (isProduction) config.devtool = false;
            return config
        },
    ),
    // 配置开发环境（请求跨域）
    devServer: overrideDevServer((config) => ({
        ...config,
        // proxy: {
        //     '/': {
        //         target: '',
        //         changeOrigin: true,
        //     },
        // }
    }))
}