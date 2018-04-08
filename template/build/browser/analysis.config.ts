import * as path from 'path'
import { Configuration } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import * as merge from 'webpack-merge'
import { baseConfig } from './base.config'

const configuration: Configuration = {
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

export default merge.smart(baseConfig, configuration)
