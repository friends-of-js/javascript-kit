const path = require('path')
const { DefinePlugin, optimize } = require('webpack')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
const merge = require('webpack-merge')
const { packageName } = require('./packageName')

exports.baseConfig = {
  context: path.resolve(__dirname, '../../'),
  target: 'web',
  entry: {
    [packageName]: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../../lib/browser'),
    filename: 'index.js',
    library: packageName,
    libraryTarget: 'umd'
  },
  optimization: {
    noEmitOnErrors: true,
    namedModules: false
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }
    }),
    new WebpackBuildNotifierPlugin({
      title: 'Webpack'
    })
  ],
  stats: {
    hash: false,
    version: false,
    timings: false,
    children: false,
    errors: true
  },
  watchOptions: {
    aggregateTimeout: 1000,
    poll: 500
  }
}
