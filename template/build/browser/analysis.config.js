const path = require('path')
const { optimize } = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const merge = require('webpack-merge')
const { baseConfig } = require('./base.config')

const configuration = {
  output: {
    path: path.resolve('bundle-analysis')
  },
  mode: 'production',
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'js-dependencies-report.html'
    }),
  ]
}

module.exports = merge.smart(baseConfig, configuration)
