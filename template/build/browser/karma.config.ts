import * as karmaChai from 'karma-chai'
import * as karmaChromeLauncher from 'karma-chrome-launcher'
<% if (!platforms.includes(this.NODE_PLATFORM)) { -%>
import * as karmaCoverage from 'karma-coverage'
import * as karmaCoverageIstanbulReporter from 'karma-coverage-istanbul-reporter'
<% } -%>
import * as karmaFirefoxLauncher from 'karma-firefox-launcher'
import * as karmaMocha from 'karma-mocha'
import * as karmaMochaReporter from 'karma-mocha-reporter'
import * as karmaNotifyReporter from 'karma-notify-reporter'
import * as karmaWebpack from 'karma-webpack'
import * as path from 'path'
import testingConfig from './testing.config'

const configuration = {
  basePath: path.resolve(__dirname, '../../'),
  failOnEmptyTestSuite: true,
  frameworks: ['mocha', 'chai'],

  files: [
    { pattern: 'spec/**/*.spec.ts', watched: true }
  ],

  mime: {
    'text/x-typescript': ['ts', 'tsx']
  },

  plugins: [
    karmaWebpack,
    karmaMocha,
<% if (!platforms.includes(this.NODE_PLATFORM)) { -%>
    karmaCoverage,
    karmaCoverageIstanbulReporter,
<% } -%>
    karmaChai,
    karmaMochaReporter,
    karmaNotifyReporter,
    karmaChromeLauncher,
    karmaFirefoxLauncher
  ],

  exclude: [],

  webpack: testingConfig,

  webpackMiddleware: {
    noInfo: true,
    quiet: true,
    stats: {
      colors: true
    },
    publicPath: '/'
  },

  preprocessors: {
    'src/**/*.ts': ['webpack'],
    'spec/**/*.ts': ['webpack']
  },

  reporters: [
    'mocha',
<% if (!platforms.includes(this.NODE_PLATFORM)) { -%>
    'coverage-istanbul',
<% } -%>
    'notify'
  ],
<% if (!platforms.includes(this.NODE_PLATFORM)) { -%>

  coverageIstanbulReporter: {
    dir: path.resolve(__dirname, '../../coverage'),
    reports: ['text', 'html'],
    fixWebpackSourcePaths: false,
    skipFilesWithNoCoverage: false,
    lcov: {
      file: 'coverage/lcov.info'
    },
    thresholds: {
      emitWarning: false,
      global: {
      statements: 90,
        lines: 90,
        branches: 90,
        functions: 90
      },
    }
  },
<% } -%>

  port: 9876,

  client: {
    captureConsole: true,
    clearContext: true
  },

  colors: true,

  autoWatch: true,

  browsers: ['Chrome', 'Firefox'],

  customLaunchers: {
    Chrome_travis_ci: {
      base: 'Chrome',
      flags: ['--no-sandbox']
    }
  },

  concurrency: Infinity
}

if (process.env.TRAVIS) {
  configuration.browsers = ['Chrome_travis_ci']
}

export default function (config: { set (config: object): void }) {
  config.set(configuration)
}
