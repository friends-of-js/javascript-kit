import { JAVASCRIPT, TYPESCRIPT } from '@friends-of-js/javascript-kit'
import { TEMPLATE_PATH } from '@friends-of-js/javascript-kit/spec'
import { expect } from 'chai'
import * as sao from 'sao'

const FILE_NAME = '.eslintrc'

describe(FILE_NAME, () => {
  describe('copy', () => {
    context('JavaScript language', () => {
      it('should be copied', async () => {
        const { fileList } = await sao.mockPrompt(TEMPLATE_PATH, {
          language: JAVASCRIPT,
          useLinter: true
        })

        expect(fileList).to.include(FILE_NAME)
      })

      context('useLinter = false', () => {
        it('should not be copied', async () => {
          const { fileList } = await sao.mockPrompt(TEMPLATE_PATH, {
            language: JAVASCRIPT,
            useLinter: false
          })

          expect(fileList).to.not.include(FILE_NAME)
        })
      })
    })

    context('TypeScript language', () => {
      it('should not be copied', async () => {
        const { fileList } = await sao.mockPrompt(TEMPLATE_PATH, {
          language: TYPESCRIPT,
          useLinter: true
        })

        expect(fileList).to.not.include(FILE_NAME)
      })
    })
  })
})
