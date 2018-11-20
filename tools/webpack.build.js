const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { commonRules, commonOpts } = require('./webpack.common.js')

const plugins = [
  new HtmlWebpackPlugin({
    template: './index.html',
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].css',
    chunkFilename: '[id].css',
  }),
]

const rules = [
  ...commonRules,
  {
    test: /\.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          // you can specify a publicPath here
          // by default it use publicPath in webpackOptions.output
          // publicPath: '../',
        },
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[hash:base64:5]',
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
  mode: 'production',
  devtool: false,
}
