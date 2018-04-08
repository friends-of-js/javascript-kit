const karmaChai = require('karma-chai')
const karmaChromeLauncher = require('karma-chrome-launcher')
<% if (!platforms.includes(this.NODE_PLATFORM)) { -%>
const karmaCoverage = require('karma-coverage')
const karmaCoverageIstanbulReporter = require('karma-coverage-istanbul-reporter')
<% } -%>
const karmaFirefoxLauncher = require('karma-firefox-launcher')
const karmaMocha = require('karma-mocha')
const karmaMochaReporter = require('karma-mocha-reporter')
const karmaNotifyReporter = require('karma-notify-reporter')
const karmaWebpack = require('karma-webpack')
const path = require('path')
const testingConfig = require('./testing.config')

const configuration = {
  basePath: path.resolve(__dirname, '../../'),
  failOnEmptyTestSuite: true,
  frameworks: ['mocha', 'chai'],

  files: [
    { pattern: 'spec/**/*.spec.js', watched: true }
  ],

  mime: {
    'text/javascript': ['js', 'jsx']
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
    'src/**/*.js': ['webpack'],
    'spec/**/*.js': ['webpack']
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

module.exports = function (config) {
  config.set(configuration)
}
