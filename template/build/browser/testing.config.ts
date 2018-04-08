import * as path from 'path'
import { Configuration } from 'webpack'
import * as merge from 'webpack-merge'
import { baseConfig } from './base.config'

const config: Configuration = {
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
        include: [path.resolve(__dirname, '../../src')],
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

export default testingConfig
