import { Answers, JAVASCRIPT, TYPESCRIPT } from '@friends-of-js/javascript-kit'
import * as gitConfigPath from 'git-config-path'
import * as parseGitConfig from 'parse-git-config'
import * as sao from 'sao'

// (Symbol as any).asyncIterator = Symbol.asyncIterator || Symbol.for('Symbol.asyncIterator')

export const TEMPLATE_PATH = {
  fromPath: __dirname
}

export const {
  user: {
    name: GIT_USER_NAME,
    email: GIT_USER_EMAIL
  }
} = parseGitConfig.sync({ cwd: '/', path: gitConfigPath('global') })

// tslint:disable:max-func-args
export async function resultsByLanguages (
  file: string,
  config: Partial<Answers> = {}
): Promise<{ ts: any, js: any }> {
  const results: { ts: string, js: string } = {} as any
  for (const language of [TYPESCRIPT, JAVASCRIPT]) {
    const stream = await sao.mockPrompt(TEMPLATE_PATH, { ...config, language })
    results[language === TYPESCRIPT ? 'ts' : 'js'] = JSON.parse(stream.fileContents(file))
  }

  return results
}

export async function assertEachLanguage (
  file: string,
  config: Partial<Answers>,
  expectationCallback: (content: any, language: string) => void
) {
  for (const language of [TYPESCRIPT, JAVASCRIPT]) {
    const stream = await sao.mockPrompt(TEMPLATE_PATH, { ...config, language })
    expectationCallback(JSON.parse(stream.fileContents(file)), language)
  }
}

// tslint:enable:max-func-args
