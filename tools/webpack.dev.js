const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  commonRules,
  commonOpts,
  createProgressPlugins,
} = require('./webpack.common.js')
const config = require('../config/index')

const rootPath = path.resolve(__dirname, '../')

const plugins = [
  new HtmlWebpackPlugin({
    template: './index.html',
  }),
  new webpack.HotModuleReplacementPlugin({
    // Options...
  }),
  createProgressPlugins(),
]

const rules = [
  ...commonRules,
  {
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[path][name][hash:base64:5]',
        },
      },
      'postcss-loader',
    ],
  },
]

module.exports = {
  ...commonOpts,
  output: {
    path: `${rootPath}/dist`,
    filename: '[name]-[hash].js',
    publicPath: config.dev.cdnPath,
  },
  module: {
    rules,
  },
  plugins,
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: `${rootPath}/public`, // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
  },
  stats: 'minimal', // lets you precisely control what bundle information gets displayed
}
