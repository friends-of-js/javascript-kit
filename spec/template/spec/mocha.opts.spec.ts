import { JAVASCRIPT, TYPESCRIPT } from '@friends-of-js/javascript-kit'
import { TEMPLATE_PATH } from '@friends-of-js/javascript-kit/spec'
import { expect } from 'chai'
import * as sao from 'sao'

const FILE_NAME = 'spec/mocha.opts'

describe(FILE_NAME, () => {
  context('TypeScript language', () => {
    it('should have content according to TypeScript language', async () => {
      const stream = await sao.mockPrompt(TEMPLATE_PATH, {
        language: TYPESCRIPT
      })

      expect(stream.fileContents(FILE_NAME)).to.equal(
        '--require ts-node/register\n--require tsconfig-paths/register\n--reporter dot\n./spec/**/*.spec.ts\n'
      )
    })
  })

  context('JavaScript language', () => {
    it('should have content according to JavaScript language', async () => {
      const stream = await sao.mockPrompt(TEMPLATE_PATH, {
        language: JAVASCRIPT
      })

      expect(stream.fileContents(FILE_NAME)).to.equal(
        '--require babel-register\n--reporter dot\n./spec/**/*.spec.js\n'
      )
    })
  })
})
