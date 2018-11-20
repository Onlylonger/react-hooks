const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].css',
    chunkFilename: '[id].css',
  }),
  createProgressPlugins(),
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
  output: {
    path: `${rootPath}/dist`,
    filename: '[name]-[hash].js',
    publicPath: config.prod.cdnPath,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules,
  },
  plugins,
  mode: 'production',
  devtool: false,
  stats: {
    assets: true,
  }, // lets you precisely control what bundle information gets displayed
  performance: {
    hints: 'warning', // enum    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
    assetFilter: function(assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
    },
  },
}
