const merge = require('webpack-merge')
const { baseConfig } = require('./base.config')

module.exports = [
  merge.smart(baseConfig, { mode: 'production', optimization: { minimize: false } }),
  merge.smart(baseConfig, {
    mode: 'production',
    output: {
      filename: 'index.min.js'
    },
    devtool: 'source-map'
  })
]
