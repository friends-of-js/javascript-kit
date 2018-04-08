import { AVAILABLE_CONFIG_TYPES, JAVASCRIPT, TYPESCRIPT } from '@friends-of-js/javascript-kit'
import { TEMPLATE_PATH } from '@friends-of-js/javascript-kit/spec'
import { expect } from 'chai'
import * as sao from 'sao'
const FILE_NAME = 'tsconfig.json'

describe(FILE_NAME, () => {
  describe('copy', () => {
    context('JavaScript language', () => {
      it('should not be copied', async () => {
        const { fileList } = await sao.mockPrompt(TEMPLATE_PATH, {
          language: JAVASCRIPT
        })

        expect(fileList).to.not.include(FILE_NAME)
      })
    })

    context('TypeScript language', () => {
      it('should be copied', async () => {
        const { fileList } = await sao.mockPrompt(TEMPLATE_PATH, {
          language: TYPESCRIPT
        })

        expect(fileList).to.include(FILE_NAME)
      })
    })
  })

  describe('content', () => {
    for (const tsConfigType of AVAILABLE_CONFIG_TYPES) {
      context(`tsConfigType = ${tsConfigType}`, () => {
        it('should set extends property', async () => {
          const stream = await sao.mockPrompt(TEMPLATE_PATH, {
            language: TYPESCRIPT,
            tsConfigType
          })

          const content = JSON.parse(stream.fileContents(FILE_NAME))

          expect(content.extends).to.equal(`./node_modules/@friends-of-js/typescript-configs/${tsConfigType}`)
        })
      })
    }

    context('tsTarget = es2015', () => {
      it('should set compilerOptions.target property', async () => {
        const stream = await sao.mockPrompt(TEMPLATE_PATH, {
          language: TYPESCRIPT,
          tsTarget: 'es2015'
        })

        const content = JSON.parse(stream.fileContents(FILE_NAME))

        expect(content.compilerOptions.target).to.equal('es2015')
      })
    })

    context('paths = package name', () => {
      it('should set compilerOptions.paths property', async () => {
        const stream = await sao.mockPrompt(TEMPLATE_PATH, {
          language: TYPESCRIPT,
          name: 'test-package-name'
        })

        const content = JSON.parse(stream.fileContents(FILE_NAME))

        expect(content.compilerOptions.paths).to.haveOwnProperty('test-package-name').that.include('src/index.ts')
        expect(content.compilerOptions.paths).to.haveOwnProperty('test-package-name/spec').that.include('spec/index.ts')
      })
    })
  })
})
