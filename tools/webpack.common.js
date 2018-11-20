const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')

const isProd = process.env.NODE_ENV === 'production'
const rootPath = path.resolve(__dirname, '../')

console.log(chalk.green(`当前构建环境: ${isProd ? '正式' : '开发'}`))

exports.commonRules = [
  {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    include: `${rootPath}/src`,
    options: {
      //
    },
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
]

exports.commonOpts = {
  entry: './src/main',
  output: {
    path: `${rootPath}/dist`,
    filename: '[name]-[hash].js',
    // publicPath: '/public/',
  },
  resolve: {
    modules: ['node_modules', `${rootPath}/src`],
    extensions: ['.js', '.json', '.ts', '.tsx'],
    alias: {
      '@': `${rootPath}/src`,
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
  context: rootPath, // string (absolute path!)
  target: 'web', // enum  // the environment in which the bundle should run
  stats: 'errors-only', // lets you precisely control what bundle information gets displayed
}
