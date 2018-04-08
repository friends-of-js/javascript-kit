import { TsConfigPathsPlugin } from 'awesome-typescript-loader'
import * as path from 'path'
import { Configuration, DefinePlugin } from 'webpack'
import * as WebpackBuildNotifierPlugin from 'webpack-build-notifier'
import { packageName } from './packageName'

export const baseConfig: Configuration = {
  context: path.resolve(__dirname, '../../'),
  target: 'web',
  entry: {
    [packageName]: './src/index.ts'
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
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    plugins: [
      new TsConfigPathsPlugin()
    ]
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
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, './tsconfig.json')
        }
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
