const camelCase = require('lodash.camelcase')
const packageJson = require('../../package.json')

exports.packageName = camelCase(packageJson.name)
