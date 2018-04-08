import * as camelCase from 'lodash.camelcase'
import * as packageJson from '../../package.json'

export const packageName = camelCase(packageJson.name)
