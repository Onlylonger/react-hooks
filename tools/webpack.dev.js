const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { commonRules, commonOpts } = require('./webpack.common.js')

const rootPath = path.resolve(__dirname, '../')

const plugins = [
  new HtmlWebpackPlugin({
    template: './index.html',
  }),
  new webpack.HotModuleReplacementPlugin({
    // Options...
  }),
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
}
