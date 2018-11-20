const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const ora = require('ora')

const isProd = process.env.NODE_ENV === 'production'
const rootPath = path.resolve(__dirname, '../')

console.log(chalk.green(`\n当前构建环境: ${isProd ? '正式' : '开发'}\n`))

const spinner = ora('prepare for building')

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
  resolve: {
    modules: ['node_modules', `${rootPath}/src`],
    extensions: ['.js', '.json', '.ts', '.tsx'],
    alias: {
      '@': `${rootPath}/src`,
    },
  },
  context: rootPath, // string (absolute path!)
  target: 'web', // enum  // the environment in which the bundle should run
}

const handler = (percentage, message, ...args) => {
  let newPercent = Math.ceil(percentage * 100)
  if (newPercent >= 100) {
    spinner.stop()
    console.log(chalk.green(`\n 构建完成 \n`))
  } else {
    spinner.text = `${chalk.green(`${newPercent}% | ${message}`)}`
    spinner.start()
  }
}

process.on('SIGINT', function() {
  spinner.stop()
  console.log(chalk.red(`\n 强制退出 \n`))
  process.exit()
})

exports.createProgressPlugins = () => {
  return new webpack.ProgressPlugin(handler)
}
