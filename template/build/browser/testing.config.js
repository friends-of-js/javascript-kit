const path = require('path')
const merge = require('webpack-merge')
const { baseConfig } = require('./base.config')

const config = {
  context: path.resolve(__dirname, '../../'),
  entry: undefined,
  output: undefined,
  target: 'web',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        enforce: 'post',
        loader: 'istanbul-instrumenter-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules|\.spec\.(js|jsx)$/,
        options: {
          esModules: true,
          compact: false
        }
      }
    ]
  },
  devtool: 'inline-source-map'
}

const testingConfig = merge.smart(baseConfig, config)

module.exports = testingConfig
