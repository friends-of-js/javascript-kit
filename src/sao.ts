import {
  AVAILABLE_CI_TOOLS,
  AVAILABLE_CODEQUALITY_TOOLS,
  AVAILABLE_CONFIG_TYPES,
  AVAILABLE_LANGUAGES,
  AVAILABLE_PACKAGE_MANAGERS,
  AVAILABLE_PLATFORMS,
  BROWSER_PLATFORM,
  CODACY_TOOL,
  CODECLIMATE_TOOL,
  CODECOV_TOOL,
  JAVASCRIPT,
  NODE_PLATFORM,
  STANDARD_CONFIG_TYPE,
  TRAVIS_CI_TOOL,
  TYPESCRIPT,
  postGenerate
} from '@friends-of-js/javascript-kit'
import * as camelcase from 'camelcase'
import * as spdxLicenseList from 'spdx-license-list/full'
import * as validatePackageName from 'validate-npm-package-name'

export interface Answers {
  name: string
  pm: string
  public: boolean
  initialVersion: string
  license: string
  description: string
  keywords: string
  author: string
  username: string
  email: string
  repository: string
  website: string
  language: string
  useBuildTools: boolean
  platforms?: string[]
  tsConfigType?: string
  useLinter?: boolean
  tslintConfigType?: string
  tsTarget?: string
  generateDocs: boolean
  ciTools: string[]
  codeQualityTools: string[]
  extension: string
  gitSSHUrl?: string
}

export const templateOptions = {
  context: {
    camelcase,
    TYPESCRIPT,
    JAVASCRIPT,
    NODE_PLATFORM,
    BROWSER_PLATFORM
  }
}

export const prompts = {
  name: {
    message: 'Enter package name',
    default: ':folderName:',
    store: false,
    filter: (name: string) => name.toLowerCase(),
    validate: (name: string) => validatePackageName(name).validForNewPackages ? true : 'Not valid package name!'
  },
  pm: {
    type: 'list',
    message: 'Choose package manager',
    choices: AVAILABLE_PACKAGE_MANAGERS,
    default: 'yarn',
    store: true
  },
  public: {
    type: 'confirm',
    message: 'Publicly available package?',
    default: true
  },
  initialVersion: {
    message: 'Initial version for package',
    default: '1.0.0',
    store: true,
    validate: (version: string) => /^\d+\.\d+\.\d+$/.test(version) ? true : 'Wrong semantic version!'
  },
  license: {
    type: 'list',
    message: 'Choose a license',
    choices: Object.keys(spdxLicenseList as { [index: string]: string }),
    default: 'MIT',
    store: true
  },
  description: {
    message: 'Any description?',
    default: '',
    store: false
  },
  keywords: {
    message: 'Write some keywords related to your project (comma/space separated)',
    default: '',
    store: false
  },
  author: {
    message: "What is your name (the author's)",
    default: ':gitUser:',
    store: true
  },
  username: {
    message: 'What is your GitHub username?',
    default: ':gitUser:',
    store: true,
    filter: (username: string) => username.toLowerCase()
  },
  email: {
    message: 'What is your GitHub email?',
    default: ':gitEmail:',
    store: true
  },
  repository: {
    message: 'Repository url?',
    store: false,
    default ({ username, name }: Partial<Answers> & { username: string, name: string }) {
      if (name.startsWith('@')) {
        return `https://github.com/${name.substring(1)}`
      }

      return `https://github.com/${username}/${name}`
    }
  },
  website: {
    message: 'The URL of your website?',
    store: true,
    default ({ username, name }: Partial<Answers> & { username: string, name: string }) {
      if (name.startsWith('@')) {
        return `https://github.com/${name.substring(1, name.indexOf('/'))}`
      }

      return `https://github.com/${username}`
    }
  },
  language: {
    type: 'list',
    message: 'Choose language',
    choices: AVAILABLE_LANGUAGES,
    default: TYPESCRIPT,
    store: true
  },
  useBuildTools: {
    type: 'confirm',
    message: 'Use build tools?',
    default: true,
    store: false
  },
  platforms: {
    type: 'checkbox',
    message: 'What platforms to use?',
    choices: AVAILABLE_PLATFORMS,
    default: [NODE_PLATFORM, BROWSER_PLATFORM],
    store: false,
    when: ({ useBuildTools }: Partial<Answers>) => useBuildTools === true,
    validate: (platforms: string[]) => platforms.length >= 1 ? true : 'You should check at least one platform!'
  },
  tsConfigType: {
    type: 'list',
    message: 'What kind of tsconfig to use?',
    choices: AVAILABLE_CONFIG_TYPES,
    default: STANDARD_CONFIG_TYPE,
    store: true,
    when: ({ language }: Partial<Answers>) => language === TYPESCRIPT
  },
  useLinter: {
    type: 'confirm',
    message: 'Use linter?',
    default: true,
    store: false
  },
  tslintConfigType: {
    type: 'list',
    message: 'What kind of tslint to use?',
    choices: AVAILABLE_CONFIG_TYPES,
    default: STANDARD_CONFIG_TYPE,
    store: true,
    when: ({ language, useLinter }: Partial<Answers>) => language === TYPESCRIPT && useLinter === true
  },
  tsTarget: {
    type: 'list',
    message: 'Select typescript output target',
    choices: ['es3', 'es5', 'es2015', 'es2016', 'es2017', 'esnext'],
    default: 'es5',
    store: true,
    when: ({ language }: Partial<Answers> & { language: string }) => language === TYPESCRIPT
  },
  generateDocs: {
    type: 'confirm',
    message: 'Would you like to automatically generate docs?',
    default: true
  },
  ciTools: {
    type: 'checkbox',
    message: 'Check CI tools to use',
    choices: AVAILABLE_CI_TOOLS,
    default: [TRAVIS_CI_TOOL],
    store: true
  },
  codeQualityTools: {
    type: 'checkbox',
    message: 'Check code quality tools to use',
    choices: AVAILABLE_CODEQUALITY_TOOLS,
    default: AVAILABLE_CODEQUALITY_TOOLS,
    store: true
  }
}

// tslint:disable:no-duplicate-string
// tslint:disable:max-line-length
export const filters = {
  LICENSE: 'license === "MIT"',
  'src/*.js': `language === '${JAVASCRIPT}'`,
  'spec/*.js': `language === '${JAVASCRIPT}'`,
  'src/*.ts': `language === '${TYPESCRIPT}'`,
  'spec/*.ts': `language === '${TYPESCRIPT}'`,
  'package-js': `language === '${JAVASCRIPT}'`,
  'package-ts': `language === '${TYPESCRIPT}'`,
  'build/**/*.js': `language === '${JAVASCRIPT}' && useBuildTools === true`,
  'build/**/*.ts': `language === '${TYPESCRIPT}' && useBuildTools === true`,
  'build/browser/**/*.js': `language === '${JAVASCRIPT}' && useBuildTools === true && platforms.includes('${BROWSER_PLATFORM}')`,
  'build/browser/**/*.ts': `language === '${TYPESCRIPT}' && useBuildTools === true && platforms.includes('${BROWSER_PLATFORM}')`,
  'build/module/*.json': `language === '${TYPESCRIPT}' && useBuildTools === true && platforms.includes('${NODE_PLATFORM}')`,
  'build/declarations/tsconfig.declarations.json': `language === '${TYPESCRIPT}' && useBuildTools === true`,
  'build/browser/tsconfig.json': `language === '${TYPESCRIPT}' && useBuildTools === true && platforms.includes('${BROWSER_PLATFORM}')`,
  'build/tslint.json': `language === '${TYPESCRIPT}' && useBuildTools === true && useLinter === true`,
  'travis.yml': `ciTools.includes('${TRAVIS_CI_TOOL}')`,
  'codeclimate.yml': `codeQualityTools.includes('${CODECLIMATE_TOOL}')`,
  'codacy.yml': `codeQualityTools.includes('${CODACY_TOOL}')`,
  'codecov.yml': `codeQualityTools.includes('${CODECOV_TOOL}')`,
  'tsconfig.json': `language === '${TYPESCRIPT}'`,
  'tslint.json': `language === '${TYPESCRIPT}' && useLinter === true`,
  'spec/tslint.json': `language === '${TYPESCRIPT}' && useLinter === true`,
  eslintrc: `language === '${JAVASCRIPT}' && useLinter === true`,
  babelrc: `language === '${JAVASCRIPT}' && useBuildTools === true`,
  'esdoc.json': `language === '${JAVASCRIPT}' && generateDocs === true`
}
// tslint:enable:max-line-length
// tslint:enable:no-duplicate-string

export function data ({ platforms, language, name }: Partial<Answers>) {
  return {
    platforms: platforms !== undefined ? platforms : [],
    extension: language === TYPESCRIPT ? 'ts' : 'js',
    packageTarFileName: name !== undefined ? name.replace('/', '-').replace('@', '') : undefined
  }
}

// tslint:disable:no-duplicate-string
// istanbul ignore next
export const move = {
  gitignore: '.gitignore',
  npmignore: '.npmignore',
  README: 'README.md',
  'package-js': 'package.json',
  'package-ts': 'package.json',
  'travis.yml': '.travis.yml',
  'codeclimate.yml': '.codeclimate.yml',
  'codacy.yml': '.codacy.yml',
  'codecov.yml': '.codecov.yml',
  eslintrc: '.eslintrc',
  babelrc: '.babelrc',
  'huskyrc.json': '.huskyrc.json',
  'esdoc.json': '.esdoc.json',
  nycrc: '.nycrc'
}
// tslint:enable:no-duplicate-string

const sao = {
  templateOptions,
  prompts,
  filters,
  data,
  move,
  post: postGenerate,
  showTip: true,
  gitInit: true,
  installDependencies: false
}

export default sao
