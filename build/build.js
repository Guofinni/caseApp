'use strict'
require('./check-versions')()//检查版本

process.env.NODE_ENV = 'production'//全局环境变量设置，当前是生产模式

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')//颜色的插件
const webpack = require('webpack')//打包插件
const config = require('../config')//配置index.js文件
const webpackConfig = require('./webpack.prod.conf')//生产配置文件

const spinner = ora('building for production...')
spinner.start()

//链接子目录和根目录
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
