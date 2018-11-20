const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'
const rootPath = path.resolve(__dirname, '../')

console.log(chalk.green(`当前构建环境: ${isProd ? '正式' : '开发'}`))

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/main',
  output: {
    path: path.resolve(rootPath, 'dist'),
    filename: '[name]-[hash].js',
    // publicPath: '/public/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: [path.resolve(rootPath, 'src')],
        exclude: [path.resolve(rootPath, 'node_modules')],
        options: {
          //
        },
      },
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
              localIdentName: isProd
                ? '[hash:base64:5]'
                : '[path][name][hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.svg$/,
        loader: '@svgr/webpack',
      },
    ],
  },
  resolve: {
    modules: ['node_modules', path.resolve(rootPath, 'src')],
    // directories where to look for modules
    extensions: ['.js', '.json', '.ts', '.tsx'],
    // extensions that are used
    alias: {
      '@': path.resolve(rootPath, 'src'),
    },
  },
  performance: {
    hints: 'warning', // enum    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
    assetFilter: function(assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
    },
  },
  devtool: 'source-map',
  context: rootPath, // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory
  target: 'web', // enum  // the environment in which the bundle should run
  // lets you provide options for webpack-serve
  stats: 'errors-only', // lets you precisely control what bundle information gets displayed
  devServer: {
    contentBase: path.join(rootPath, 'public'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin({
      // Options...
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
}
