const CompressionPlugin = require('compression-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pxtoviewport = require('postcss-px-to-viewport');
var path = require('path');
const webpackBundleEnv = ['dev-staging', 'dev-production']
module.exports = {
  outputDir: 'middle_data_analysis',
  transpileDependencies: ['resize-detector'],
  chainWebpack: config => {

    const svgRule = config.module.rule('svg')

    // clear all existing loaders.
    // if you don't do this, the loader below will be appended to
    // existing loaders of the rule.
    svgRule.uses.clear()

    svgRule
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, './src/assets/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    config.optimization.clear('splitChunks').splitChunks({
      cacheGroups: {
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        },
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        vue: {
          name: 'echarts',
          test: /[\\/]node_modules[\\/]echarts[\\/]/,
          priority: 3,
          chunks: 'initial'
        },
        swiper: {
          name: 'swiper',
          test: /[\\/]node_modules[\\/]swiper[\\/]/,
          priority: 3,
          chunks: 'initial'
        },
        lodash: {
          name: 'lodash',
          test: /[\\/]node_modules[\\/]lodash[\\/]/,
          priority: 3,
          chunks: 'initial'
        },
        vant: {
          name: 'vant',
          test: /[\\/]node_modules[\\/]vant[\\/]/,
          priority: 3,
          chunks: 'initial'
        },
      }
    })

    /* 添加分析工具*/
    if (webpackBundleEnv.includes(process.env.NODE_ENV)) {
      config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin).end();
      config.plugins.delete('prefetch')
    }
  },
  // 压缩js、css文件
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
      return {
        plugins: [
          // 压缩代码
          new CompressionPlugin({
            test: /\.js$|\.html$|.\css/, // 匹配文件名
            threshold: 10240, // 对超过10k的数据压缩
            deleteOriginalAssets: false // true 不删除源文件 false 删除源文件
          })
        ],
      }
    } else {}
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 375
          })
        ]
      }
    }
  }
}