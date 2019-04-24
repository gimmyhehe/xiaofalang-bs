// vue.config.js
const path = require('path')
const webpack = require('webpack')

const resolve = dir => {
  return path.join(__dirname, dir)
}
const myConfig = require('./config/myconfig')
const env = require('./config/' + (process.env.env_config || 'prod') + '.env')

module.exports = {
  // css相关配置
  css: {
  // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV !== 'production') {
      config.plugins.delete('preload')
      config.plugins.delete('prefetch')
    }
    config.set('devtool', false)// 取消生成sourceMap文件
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('./src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  },
  configureWebpack: config => {
    const CopyWebpackPlugin = require('copy-webpack-plugin')
    let _plugins = [
      new webpack.DefinePlugin({ 'process.env': env }),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, './static'),
          to: './static'
        }
      ])
    ]

    if (process.env.NODE_ENV === 'production') {
      var CompressionWebpackPlugin = require('compression-webpack-plugin')
      _plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          include: new RegExp(// gz压缩,(后缀名前的一段命名为config.的过滤掉)
            `\.(${['js', 'css', 'ttf'].join('|')})$`
          ),
          exclude: new RegExp(// gz压缩,(后缀名前的一段命名为config.的过滤掉)
            `\.config\.(${['js', 'css', 'ttf'].join('|')})$`
          ),
          // test: new RegExp(// gz压缩,(后缀名前的一段命名为config.的过滤掉)1
          //   `^((?!config\.).)+\.(${['js', 'css', 'ttf'].join('|')})$`
          // ),
          threshold: 0,
          minRatio: 0.8
        })
      )
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
    return {
      plugins: [
        ..._plugins
      ]
    }
  },
  devServer: {
    proxy: myConfig.SERVER+'/HairStyle/api/'
  }
}
