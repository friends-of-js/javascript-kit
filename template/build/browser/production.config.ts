import * as merge from 'webpack-merge'
import { baseConfig } from './base.config'

export default [
  merge.smart(baseConfig, { mode: 'production', optimization: { minimize: false } }),
  merge.smart(baseConfig, {
    mode: 'production',
    output: {
      filename: 'index.min.js'
    },
    devtool: 'source-map'
  })
]
